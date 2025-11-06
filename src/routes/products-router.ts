import { ProductController } from "../controllers/products-controller";
import { Router } from "express";

const productsController = new ProductController();

const productsRouter = Router();

productsRouter.post("/", productsController.create);
productsRouter.get("/", productsController.index);
productsRouter.put("/:id", productsController.update);
productsRouter.delete("/:id", productsController.remove);

export { productsRouter };
