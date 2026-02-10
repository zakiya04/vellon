import {Router} from "express";
import { getOrders, getUserProfile, loginUser, logOutUser, registerUser, updateUser } from "../controllers/users.controllers";
import { checkJwt } from "../middlewares/auth.middleware";


export const userRouter = Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)

userRouter.use(checkJwt)

userRouter.post("/logout",logOutUser)
userRouter.get("/allOrders", getOrders)
userRouter.get("/profile",getUserProfile)
userRouter.post("/update",updateUser)
