import { ProductController } from "../controllers/products-controller";
import { Router } from "express";

const productsRouter = Router();
const productsController = new ProductController();

productsRouter.post("/", productsController.create);
productsRouter.get("/", productsController.index);
productsRouter.put("/:id", productsController.update);
productsRouter.delete("/:id", productsController.remove);

export { productsRouter };
