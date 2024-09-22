import express from "express";
import {isAuthenticated} from "../middlewares/isAuthenticated.js"
import { getAdminJob, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").post(isAuthenticated,getAllJobs);
router.route("/get/:id").post(isAuthenticated,getJobById);
router.route("/admin").post(isAuthenticated,getAdminJob);

export default router;