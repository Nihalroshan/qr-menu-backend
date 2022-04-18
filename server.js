const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const adminProducts = require("./routes/admin/products");
const adminCategories = require("./routes/admin/categories");
const adminLogin=require("./routes/admin/login")

app.use(express.json());

app.use(cors());

//Routes
app.use("/api/admin/products", adminProducts);
app.use("/api/admin/categories", adminCategories);
app.use("/api/admin/auth", adminLogin);

//DB
mongoose
  .connect(
    "mongodb+srv://thanos:T3TjzjiRJ956PMYn@cluster0.4kiky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

const PORT = 4000;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
