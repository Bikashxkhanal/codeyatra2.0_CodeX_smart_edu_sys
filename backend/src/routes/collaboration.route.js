import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { createCollaboration,
    deleteCollaborattion,
  updateCollaboration,
//   getACollaboration,
  getAllCollaboration,
  getAllOwnerCollaboration,  } from "../controllers/collaboration.controller.js";


const collaborationRouter = new Router();

collaborationRouter.route("/create").post(verifyJWT, createCollaboration);
collaborationRouter.route(":id").delete(verifyJWT, deleteCollaborattion);
// collaborationRouter.route("/:id").get(verifyJWT, getACollaboration);
collaborationRouter.route("/all").get(verifyJWT, getAllCollaboration);
collaborationRouter.route("/:id/all").get(verifyJWT, getAllOwnerCollaboration );

export {collaborationRouter}