const express = require("express");
require("./db/config");
const User = require("./db/user");
const Product = require("./db/product");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  //we are not returning a password in response we have manually delete it from response
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  //IF USER only enter email and password then user data or login activity should perform otherwise No user Found
  if (req.body.password && req.body.email) {
    const user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ Result: "No User Found" });
    }
  } else {
    res.send({ Result: "No User Found" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.listen(5000);
