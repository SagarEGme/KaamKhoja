import { Job } from "../models/job.model.js"

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, experienceLevel, location, jobType, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !salary || !requirements || !experienceLevel || !location || !jobType || !position ) {
            return res.status(400).json({
                message: "some post job data is missing.",
                success: false,
            })
        } 

        const job = await Job.create({
            title, description, requirements: requirements.split(","), salary: Number(salary), experienceLevel, location, jobType, position, company: companyId, created_by: userId
        })

        return res.status(201).json({
            message: "job post created successfully.",
            job,
            success: true,
        })
    } catch (error) {
        console.log("error in posting job", error);
    }
}

//for students
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }

        const jobs = await Job.find(query);

        if (!jobs) {
            return res.status(400).json({
                message: "Jobs not found.",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Lists of jobs: ",
            jobs,
            success: true,
        })


    } catch (error) {
        console.log("error in getting jobs", error);
    }

}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(400).json({
                message: "Job not found.",
                success: false,
            })
        }
        return res.status(200).json({
            message: "details of job: ",
            job,
            success: true,
        })

    } catch (error) {
        console.log("error is getting job by id", error);

    }
}

export const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id;
        const job = await Job.findById({ created_by: adminId });
        if (!job) {
            return res.status(400).json({
                message: "Job not found.",
                success: false,
            })
        }
        return res.status(200).json({
            message: "details of job posted by admin : ",
            job,
            success: true,
        })

    } catch (error) {
        console.log("error is getting admin job", error);

    }
}