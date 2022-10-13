import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedProduct from "./router/seedProduct.js";
import productRouter from "./router/product.js";
import userRouter from "./router/user.js";
import orderRouter from "./router/order.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(err.message);
  });

// ^^ DB

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use("/api/seed", seedProduct);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
