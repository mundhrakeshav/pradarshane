const express = require("express");
const mongooseModels = require("./mongooseModels");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(cors());

mongoose.connect(
  "mongodb://127.0.0.1:27017/pradarshanee",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected to mongoDB ");
  }
);

app.post("/addToMarketPlace", (req, res) => {
  const userAddress = req.body.userAddress;
  const contractAddress = req.body.contractAddress;
  const tokenType = req.body.tokenType;
  console.log(req.body);
  const newItem = mongooseModels.marketPlaceItem({
    userAddress,
    contractAddress,
    tokenType,
  });
  newItem.save();
});

app.get("/getMarketPlace", (req, res) => {
  mongooseModels.marketPlaceItem.find({}, (e, items) => {
    console.log(items);
    res.send(items);
  });
});

app.post("/getTransferableTokens", (req, res) => {
  const address = req.body.account;
  console.log(address);
  mongooseModels.user.findOne({ userAddress: address }, (e, user) => {
    console.log(user);
    res.json(user.transferableContracts);
  });
});

app.post("/getTransferableOwnableContracts", (req, res) => {
  const address = req.body.account;
  console.log(address);
  mongooseModels.user.findOne({ userAddress: address }, (e, user) => {
    console.log(user);
    res.json(user.transferableOwnableContracts);
  });
});

app.post("/nonTransferableContracts", (req, res) => {
  const address = req.body.mintAddress;
  console.log(address);
  mongooseModels.user.findOne(
    { userAddress: req.body.mintAddress },
    (e, user) => {
      if (user) {
        let transferrableContracts = user.nonTransferableContracts;
        if (!transferrableContracts.includes(req.body.address)) {
          transferrableContracts = [
            ...transferrableContracts,
            req.body.address,
          ];
          user.nonTransferableContracts = transferrableContracts;
        }
        user.save();
      } else {
        const newUser = mongooseModels.user({
          userAddress: address,
          nonTransferableContracts: [req.body.address],
        });
        newUser.save().then((err, newUser) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
      }
    }
  );
  res.send("Server working 🔥");
});

app.post("/addTransferableOwnableContracts", (req, res) => {
  const address = req.body.mintAddress;
  console.log(address);
  mongooseModels.user.findOne(
    { userAddress: req.body.mintAddress },
    (e, user) => {
      if (user) {
        let transferrableOwnableContracts = user.transferableOwnableContracts;
        if (!transferrableOwnableContracts.includes(req.body.address)) {
          transferrableOwnableContracts = [
            ...transferrableOwnableContracts,
            req.body.address,
          ];
          user.transferableOwnableContracts = transferrableOwnableContracts;
        }
        user.save();
      } else {
        const newUser = mongooseModels.user({
          userAddress: address,
          transferableOwnableContracts: [req.body.address],
        });
        newUser.save().then((err, newUser) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
      }
    }
  );
  res.send("Server working 🔥");
});

app.post("/addTransferableToken", (req, res) => {
  const address = req.body.mintAddress;
  console.log(address);
  mongooseModels.user.findOne(
    { userAddress: req.body.mintAddress },
    (e, user) => {
      if (user) {
        let transferrableContracts = user.transferableContracts;
        if (!transferrableContracts.includes(req.body.address)) {
          transferrableContracts = [
            ...transferrableContracts,
            req.body.address,
          ];
          user.transferableContracts = transferrableContracts;
        }
        user.save();
      } else {
        const newUser = mongooseModels.user({
          userAddress: address,
          transferableContracts: [req.body.address],
        });
        newUser.save().then((err, newUser) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
      }
    }
  );
  res.send("Server working 🔥");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
