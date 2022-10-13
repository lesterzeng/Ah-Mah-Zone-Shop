import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { body, validationResult } from "express-validator";
import auth from "../middleware/auth.js";

const userRouter = express.Router();

/////// SIGNIN //////////////

userRouter.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "not authorized" });
    }
    const result = await bcrypt.compare(req.body.password, user.password);

    if (!result) {
      console.log("username or password error");
      return res.status(401).json({ status: "error", message: "login failed" });
    }

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    const response = { access, refresh, payload };
    res.json(response);
  } catch (error) {
    console.log("POST/login", error);
    res.status(400).json({ status: "error", message: "login failed" });
  }
});

/////// REGISTER ///////////

userRouter.put(
  "/register",
  [
    body(
      "password",
      "Invalid. Password need to be at least 12 characters (alphanumeric only)"
    )
      .not()
      .isEmpty()
      .isLength({ min: 12 })
      .isAlphanumeric(),
    body("email", "Invalid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
        message: "Please re-enter your inputs",
      });
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ status: "error", message: "email already exist" });
      }
      if (req.body.password !== req.body.password1) {
        return res
          .status(400)
          .json({ status: "error", message: "Passwords does not match" });
      }

      const password = await bcrypt.hash(req.body.password, 12);
      const createdUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: password,
      });

      console.log("created user: ", createdUser);
      res.json({ message: "user created" });
    } catch (err) {
      console.log("PUT /create", err);
      res
        .status(400)
        .json({ status: "error", message: "an error has occurred" });
    }
  }
);

/////// UPDATE ///////////////////

userRouter.patch("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    if (req.body.password) {
      const password = await bcrypt.hash(req.body.password, 12);
      user.password = password || user.password;
    }
    const updatedDetails = await user.save();

    res.send({
      _id: updatedDetails._id,
      name: updatedDetails.name,
      email: updatedDetails.email,
      isAdmin: updatedDetails.isAdmin,
    });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

//////// DISPLAY ALL //////////////
userRouter.get("/userslist", auth, async (req, res) => {
  if (req.decoded.isAdmin) {
    const users = await User.find();
    res.json(users);
  } else {
    res.status(401).json({
      status: "error",
      message: "unauthorized",
    });
  }
});
//////// DELETE ///////////////////

userRouter.delete("/delete/:id", auth, async (req, res) => {
  if (req.decoded.isAdmin) {
    // const { username } = req.body;
    await User.deleteOne({ _id: req.params.id });

    res.json({ status: "okay", message: "deleted" });
  } else {
    console.log("DELETE/ user");
    res.status(400).json({ status: "error", message: "not authorized" });
  }
});

export default userRouter;
