import { Request, Response } from "express";
import { knex } from "@/database/knex";
import z from "zod";

class TablesController {
  async index(req: Request, res: Response) {
    const tables = await knex<TableRepository>("tables")
      .select()
      .orderBy("table_number");
    return res.status(200).json(tables);
  }
}

export { TablesController };
