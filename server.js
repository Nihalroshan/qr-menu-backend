const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const products = require("./routes/products");
const categories = require("./routes/categories");
const login = require("./routes/login");
const client = require("./routes/clients");
const orders = require("./routes/orders");

app.use(express.json());

app.use(cors());

//Routes
app.use("/api/products", products);
app.use("/api/categories", categories);
app.use("/api/auth", login);
app.use("/api/client", client);
app.use("/api/orders", orders);

//DB
mongoose
  .connect(
    "mongodb+srv://thanos:T3TjzjiRJ956PMYn@cluster0.4kiky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

const PORT = 4000;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
