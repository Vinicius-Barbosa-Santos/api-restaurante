import { ProductsController } from "../controllers/products-controller";
import { Router } from "express";

const productsController = new ProductsController();

const productsRouter = Router();

productsRouter.post("/", productsController.create);
productsRouter.get("/", productsController.index);
productsRouter.delete("/:id", productsController.delete);

export { productsRouter };
