const express = require("express");
const adminAuth = require("../middlewares/adminAuth");
const router = express.Router();
const Product = require("../models/product");
const parser = require("../middlewares/imageUploadMiddleware");

//Get all products details
router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.send(product);
  } catch (err) {
    res.send({ message: err });
  }
});

//Submits a product
router.post("/", adminAuth, parser.single("image"), async (req, res) => {
  const { name, description, category, price } = req.body;
  let product = new Product({
    name,
    description,
    category,
    price,
    imageUrl: req.file.path,
  });

  try {
    product = await product.save();
    res.send(product);
  } catch (err) {
    res.send({ message: err });
  }
});

//Get back specific post
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).send("Product not found.");
    res.send(product);
  } catch (err) {
    res.send({ message: err });
  }
});

//Delete a Product
router.delete("/:productId", adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).send("Product not found.");
    const deletedProduct = await Product.deleteOne({
      _id: req.params.productId,
    });
    res.send(deletedProduct);
  } catch (err) {
    res.send({ message: err });
  }
});

//Update a Prduct
router.patch("/:productId", adminAuth, async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send("Product not found.");
    const { name, description, category, price, imageUrl } = req.body;
    const updatedData = { name, description, category, price, imageUrl };
    const updatedProduct = await Product.updateOne(
      { _id: productId },
      updatedData
    );

    res.send(updatedProduct);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
