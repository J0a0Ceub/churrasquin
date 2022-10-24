import { Router } from "express";
import listRouter from "./resource/list/router";
import userRouter from "./resource/user/router";

const appRouter = Router();

appRouter.use(userRouter);
appRouter.use(listRouter);

export default appRouter;
