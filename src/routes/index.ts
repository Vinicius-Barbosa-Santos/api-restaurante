import { Router } from "express";
import { productsRouter } from "./products-router";
import { tablesRouter } from "./tables-router";

const router = Router();

router.use("/products", productsRouter);
router.use("/tables", tablesRouter);

export { router };
