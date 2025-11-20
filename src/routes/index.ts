import { Router } from "express";
import { productsRouter } from "./products-router";
import { tablesRouter } from "./tables-router";
import { tablesSessionsRouter } from "./tables-sessions-router";
import { ordersRouter } from "./orders-router";

const router = Router();

router.use("/products", productsRouter);
router.use("/tables", tablesRouter);
router.use("/tables-sessions", tablesSessionsRouter);
router.use("/orders", ordersRouter);

export { router };
