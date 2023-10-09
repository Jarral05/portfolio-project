import express from "express";
const orderRoute = express.Router();
import {
  createOrder,
  orderOfSpecificUser,
} from "../controller/order.controller.js";

orderRoute.post("/order", createOrder);
orderRoute.get("/order:userId", orderOfSpecificUser);

export { orderRoute };
