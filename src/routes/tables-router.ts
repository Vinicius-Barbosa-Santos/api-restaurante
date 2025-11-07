import { TablesController } from "@/controllers/tables-controller";
import { Router } from "express";

const tablesController = new TablesController();

const tablesRouter = Router();

tablesRouter.post("/", tablesController.create);
tablesRouter.get("/", tablesController.index);

export { tablesRouter };
