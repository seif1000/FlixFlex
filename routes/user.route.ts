import { Router } from "express";
import { login, refreshToken, signup } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/refresh_token", refreshToken);

export { userRouter };
