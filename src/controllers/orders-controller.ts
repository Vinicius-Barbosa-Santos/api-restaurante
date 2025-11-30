import { NextFunction, Request, Response } from "express";
import z from "zod";
import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";

class OrdersController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        req.body
      );

      const session = await knex<TablesSessionsRepository>("tables_sessions")
        .where({ id: table_session_id })
        .first();

      if (!session) {
        throw new AppError("Session not found", 404);
      }

      if (session.closed_at) {
        throw new AppError("Session closed", 400);
      }

      const product = await knex<ProductRepository>("products")
        .where({ id: product_id })
        .first();

      if (!product) {
        throw new AppError("Product not found", 404);
      }

      await knex<OrderRepository>("orders").insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      });

      return res.status(201).json();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      next(error);
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const table_session_id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(req.params.table_session_id);

      const orders = await knex<OrderRepository>("orders")
        .where({ table_session_id })
        .select(
          "orders.id",
          "orders.table_session_id",
          "orders.product_id",
          "orders.price",
          "products.name",
          "orders.quantity",
          knex.raw("orders.price * orders.quantity as total_price"),
          "orders.created_at",
          "orders.updated_at"
        )
        .join("products", "products.id", "orders.product_id")
        .orderBy("orders.created_at", "desc");

      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const table_session_id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(req.params.table_session_id);

      const order = await knex<OrderRepository>("orders")
        .select(
          knex.raw("coalesce(sum(orders.price * orders.quantity), 0) as price"),
          knex.raw("coalesce(sum(orders.quantity), 0) as quantity")
        )
        .where({ table_session_id })
        .first();

      return res.json(order);
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
