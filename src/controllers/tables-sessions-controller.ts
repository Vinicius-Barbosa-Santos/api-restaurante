import { Request, Response } from "express";

class TablesSessionsController {
  async create(req: Request, res: Response) {
    return res.status(201).json({
      message: "Table session created successfully",
    });
  }
}

export { TablesSessionsController };
