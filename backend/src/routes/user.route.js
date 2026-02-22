import { Router } from "express";
import { loginUser } from "../controllers/user.controller.js";


const userRouter =new Router();

//route for logging into the system
userRouter.route('/login').post(loginUser);


export default userRouter;