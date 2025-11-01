import { ProductsController } from "../controllers/products-controller";
import { Router } from "express";

const productsController = new ProductsController();

const productsRouter = Router();

productsRouter.post("/", productsController.create);

export { productsRouter };
