const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "ordered",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
