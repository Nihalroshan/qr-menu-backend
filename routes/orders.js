const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Client = require("../models/client");

router.post("/", async (req, res) => {
  const { userId, products, totalPrice } = req.body;
  const user = await Client.findOne({ _id: userId });
  if (!user) return res.status(404).send("No user found");
  const userDetails = { id: user.id, name: user.name };

  let orderDetails = new Order({
    user: userDetails,
    products,
    totalPrice,
  });

  try {
    orderDetails = orderDetails.save();
    res.send(orderDetails);
  } catch (err) {
    res.send({ message: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();

    // const userIds = orders.map((order) => order.userId);

    //Grouping by status
    const ordersGrouped = orders.reduce((acc, order) => {
      (acc[order["status"]] = acc[order["status"]] || []).push(order);
      return acc;
    }, {});

    // const users = await Client.find({ _id: { $in: userIds } });

    res.send(ordersGrouped);
  } catch (err) {
    res.send({ message: err });
  }
});

router.patch("/:orderId", async (req, res) => {
  try {
    let order = await Order.updateOne(
      { _id: req.params.orderId },
      { $set: { status: req.body.status } }
    );
    res.send(order);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
