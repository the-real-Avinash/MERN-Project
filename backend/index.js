const express = require("express");
require("./db/config");
const User = require("./db/user");
const Product = require("./db/product");
const cors = require("cors");

const Jwt = require("jsonwebtoken");
const JwtKey = "e-comm";

const app = express();

app.use(express.json());
//to resolve cors issue we need to implement cors package
app.use(cors());

//register API
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  //we are not returning a password in response we have manually delete it from response
  result = result.toObject();
  delete result.password;
  res.send(result);
});

//Login API
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

//Add Product API
app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

//list products api
app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "Result not found" });
  }
});

//delete product API
app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

//update Product API to get prefilled data
app.get("/product/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ Result: "No records Found" });
  }
});

//Actual Update API
app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

//Search API
app.get("/search/:key", async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

app.listen(5000);
