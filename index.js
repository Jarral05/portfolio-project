import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { router } from "./routes/user.route.js";
import { routerProducts } from "./routes/products.route.js";
import { cartRoute } from "./routes/cart.route.js";
import dotenv from "dotenv";

const app = express();

const port = 4000;

dotenv.config();

app.use(bodyParser.json());

// Route for users
app.use("/api", router);

// Route for products
app.use("/api", routerProducts);

// Route for cart
app.use("/api", cartRoute);

// For connecting Database

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  console.log("Database Connected");
});

// Starting the server

app.listen(process.env.PORT, () => {
  console.log(`Server is runing on port: ${process.env.PORT}`);
});
