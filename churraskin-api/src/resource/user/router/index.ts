import { Router } from "express";
import login from "../use-cases/login";
import signUp from "../use-cases/sign-up";

const userRouter = Router();

userRouter.post("/sign-up", signUp);
userRouter.post("/login", login);

export default userRouter;
