import { Router } from "express";
import { createQuery, getAllCurrentUserQuery, getAllQuery , addAResponse} from "../controllers/query.controller";
import { verifyJWT } from "../middlewares/auth.middleware";


const queryRouter = new Router();

//all proteced routes
queryRouter.route('/create').post(verifyJWT, createQuery);
queryRouter.route('/:id/all').get(verifyJWT, getAllCurrentUserQuery);
queryRouter.route('/all').get(verifyJWT, getAllQuery);

export {
    queryRouter 
}