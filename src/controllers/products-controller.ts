import { Request, Response } from "express";

class ProductsController {
  async create(req: Request, res: Response) {
    res.status(201).json({ message: "Product created" });
  }
}

export { ProductsController };
