import { Request, Response } from "express";
import { knex } from "../database/knex";
import z from "zod";

class ProductsController {
  async create(req: Request, res: Response) {
    try {
      const bodySchema = z.object({
        name: z
          .string()
          .min(4, "O nome do produto deve ter pelo menos 4 caracteres"),
        price: z.number().positive(),
      });

      const { name, price } = bodySchema.parse(req.body);

      await knex<ProductRepository>("products").insert({ name, price });

      return res.status(201).json();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json(error.issues);
      }
    }
  }

  async index(req: Request, res: Response) {
    const querySchema = z.object({
      name: z.string().optional(),
    });

    try {
      const { name } = querySchema.parse(req.query);

      if (!name) {
        const products = await knex<ProductRepository>("products")
          .select()
          .orderBy("name");

        return res.status(200).json(products);
      }

      const products = await knex<ProductRepository>("products")
        .select()
        .where("name", `%${name}%`)
        .orderBy("name");

      return res.status(200).json(products);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json(error.issues);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const paramsSchema = z.object({
        id: z
          .string()
          .transform((value) => Number(value))
          .refine((value) => !isNaN(value), { message: "ID inválido" }),
      });

      const { id } = paramsSchema.parse(req.params);

      await knex<ProductRepository>("products").where({ id }).delete();

      return res.status(204).json();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json(error.issues);
      }
    }
  }
}

export { ProductsController };
