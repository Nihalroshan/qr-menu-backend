const express = require("express");
const router = express.Router();
const Client = require("../models/client");

//Registering a new client
router.post("/", async (req, res) => {
  const { name } = req.body;

  let client = new Client({
    name,
  });

  try {
    client = await client.save();
    res.send(client);
  } catch (err) {
    res.send(err.message);
  }
});

//Add products to client's cart
router.post("/addCart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { id, name, imageUrl, price } = req.body;
    const cartData = { id, name, imageUrl, price };
    const user = await Client.findById(userId);
    if (!user) return res.status(400).send("User doesn't exist.");

    await Client.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          cart: cartData,
        },
      }
    );
    res.send("Added to cart");
  } catch (err) {
    res.send(err.message);
  }
});

//Get cart of a client
router.get("/cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const client = await Client.findById(userId);
    if (!client) return res.send("User doesn't exist.");

    res.send(client);
  } catch (err) {
    res.send(err.message);
  }
});

//Delete item from cart
router.delete("/cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.query;
    const client = await Client.findById(userId);
    if (!client) return res.send("User doesn't exist.");

    await Client.updateOne(
      { _id: userId },
      {
        $pull: {
          cart: { id: productId },
        },
      }
    );
    res.send("Deleted successfully.");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
