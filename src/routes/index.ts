import { Router } from "express";
import { productsRouter } from "./products-router";
import { tablesRouter } from "./tables-router";
import { tablesSessionsRouter } from "./tables-sessions-router";

const router = Router();

router.use("/products", productsRouter);
router.use("/tables", tablesRouter);
router.use("/tables-sessions", tablesSessionsRouter);

export { router };
