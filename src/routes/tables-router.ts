import { TablesController } from "@/controllers/tables-controller";
import { Router } from "express";

const tablesRouter = Router();
const tablesController = new TablesController();

tablesRouter.get("/", tablesController.index);

export { tablesRouter };
