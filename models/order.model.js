import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
      },
    },
  ],
  status: {
    type: String,
    default: "pending",
  },
  orderDate: {
    type: String,
    default: new Date(),
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
