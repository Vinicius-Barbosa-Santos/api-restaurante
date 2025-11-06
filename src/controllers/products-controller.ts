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
}

export { ProductsController };
