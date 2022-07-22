const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  cart: {
    type: Array,
    default: [],
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
