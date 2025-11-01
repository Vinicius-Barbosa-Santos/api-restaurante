import { Request, Response } from "express";
import z from "zod";

class ProductsController {
  async create(req: Request, res: Response) {
    res.status(201).json({ message: "Product created" });
  }
}

export { ProductsController };
