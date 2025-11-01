import { Request, Response } from "express";

class ProductsController {
  async create(req: Request, res: Response) {
    res.json({ message: "Create product" });
  }
}

export { ProductsController };
