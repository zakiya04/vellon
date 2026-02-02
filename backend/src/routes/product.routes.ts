import Router from "express";
import { getAllProducts } from "../controllers/product.controllers";

const productRouter = Router();

productRouter.route("/").get(getAllProducts)