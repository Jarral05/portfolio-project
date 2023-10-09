import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

import {
  login,
  register,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  forgotPassword,
} from "../controller/user.controller.js";

const middleware = (req, res, next) => {
  console.log("Middleware Calling");
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization; //token get
  token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
    }
    console.log("Successfully Verify Token");
    next();
  });
};

router.get("/user", middleware, getAllUsers);
// router.post("/user",getAllUsers)
// router.post("/user/create-index", createIndex);

router.get("/user/:id", getSingleUser);
router.put("/user/:id", updateSingleUser);
router.delete("/user/:id", deleteSingleUser);
// router.get("/user/get",getAllUsersIndex)
router.post("/user-reg", register);
router.post("/user-login", login);
router.post("/user-forgot", forgotPassword);

export { router };
