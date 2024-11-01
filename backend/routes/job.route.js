import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { deleteJobById, getAdminJob, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/delete/:id").delete(isAuthenticated,deleteJobById);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/admin/jobs").get(isAuthenticated,getAdminJob);

export default router;