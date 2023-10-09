import express from "express";

const routerProducts = express.Router();

import {
  createProduct,
  getAllProducts,
  getSingularProduct,
  updateSingleProduct,
  deleteSingleProduct,
} from "../controller/products.controller.js";

routerProducts.post("/product", createProduct);
routerProducts.get("/product", getAllProducts);
routerProducts.get("/product/:productId", getSingularProduct);
routerProducts.put("/product/:productId", updateSingleProduct);
routerProducts.delete("/product/:productId", deleteSingleProduct);

export { routerProducts };
