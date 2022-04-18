const express = require("express");
const router = express.Router();
const Category = require("../../models/admin/Category");

//Get all category details
router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    res.send(category);
  } catch (err) {
    res.send({ message: err });
  }
});

//Submits a Category
router.post("/", async (req, res) => {
  const { name, description, imageUrl } = req.body;
  let category = new Category({
    name,
    description,
    imageUrl,
  });

  try {
    category = await category.save();
    res.send(category);
  } catch (err) {
    res.send({ message: err });
  }
});

//Get back specific category
router.get("/:categoryId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).send("Category not found.");
    res.send(category);
  } catch (err) {
    res.send({ message: err });
  }
});

//Delete a Specific Category
router.delete("/:categoryId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).send("Category Not found.");
    const deletedCategory = await Category.deleteOne({
      _id: req.params.categoryId,
    });
    res.send(deletedCategory);
  } catch (err) {
    res.send({ message: err });
  }
});

//Update a Category
router.patch("/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).send("Category not found.");
    const { name, description, imageUrl } = req.body;
    const updatedData = { name, description, imageUrl };
    const updatedCategory = await Category.updateOne(
      { _id: categoryId },
      updatedData
    );

    res.send(updatedCategory);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
