const mongoose = require("mongoose");

const userDataSchema = mongoose.Schema({
  userAddress: String,
  transferableContracts: [String],
  nonTransferableContracts: [String],
  transferableOwnableContracts: [String],
});

const marketPlaceItemSchema = mongoose.Schema({
  userAddress: String,
  contractAddress: String,
  tokenType: Number,
});

module.exports = {
  user: mongoose.model("User", userDataSchema),
  marketPlaceItem: mongoose.model("MarketPlaceItem", marketPlaceItemSchema),
};
