import express from "express";
const cartRoute = express.Router();

import { addToCart, userCartScreen } from "../controller/cart.controller.js";

cartRoute.post("/cart", addToCart);
cartRoute.get("/cart:userId", userCartScreen);

export { cartRoute };
