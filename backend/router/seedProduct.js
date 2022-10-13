import express from "express";
import Product from "../models/product.js";
import itemsData from "../itemsData.js";
import User from "../models/user.js";

const seedProduct = express.Router();

seedProduct.get("/", async (req, res) => {
  // await Product.remove({});
  // const createProducts = await Product.insertMany(itemsData.products);
  // res.send({ createProducts });
  // console.log("products seeded");
  //////
  await User.remove({});
  const createUsers = await User.insertMany(itemsData.users);
  res.send({ createUsers });
  console.log("users seeded");
});

export default seedProduct;

// ^^ to seed products and users
