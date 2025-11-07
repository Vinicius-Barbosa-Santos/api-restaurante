import { Request, Response } from "express";
import { knex } from "@/database/knex";

class TablesController {
  async create(req: Request, res: Response) {
    return res.status(201).json({ message: "Table created!" });
  }

  async index(req: Request, res: Response) {
    const tables = await knex<TableRepository>("tables")
      .select()
      .orderBy("table_number");
    return res.status(200).json(tables);
  }
}

export { TablesController };
