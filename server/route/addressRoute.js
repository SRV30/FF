import express from "express";
import auth from "../middleware/auth.js";
import {
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../controllers/addressConroller.js";

const addressRouter = express.Router();

addressRouter.post("/create", auth, addAddress);

addressRouter.get("/get", getAddress);

addressRouter.put("/update", updateAddress);

addressRouter.delete("/delete", deleteAddress);

export default addressRouter;
