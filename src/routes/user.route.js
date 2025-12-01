import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { registerUser,getUserDetails,loginUser,logoutUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT,logoutUser);
userRouter.route("/user").get(verifyJWT,getUserDetails);

export {
    userRouter
}