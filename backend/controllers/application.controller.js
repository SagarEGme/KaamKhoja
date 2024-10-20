import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";


export const applyJob = async (req, res) => {
    //   try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
        return res.status(400).json({
            message: "Please mention the job id.",
            success: false,
        })
    }
    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({
            message: "No job found.",
            success: false,
        })
    }
    const alreadyApplied = await Application.findOne({ job: jobId, applicant: userId });
    if (alreadyApplied) {
        return res.status(400).json({
            message: "You have already applied for this post.",
            success: false,
            job
        })
    }

    //create an application for job
    const newApplication = await Application.create({
        job: jobId,
        applicant: userId,
    })
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
        message: "appllicaiton submitted successfully.",
        success: true,
    })
    //   } catch (error) {
    //     console.log("error in applying",error)
    //   }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).populate({
            path:"job",
            populate:{
                path:'company'
            }
        });
        // learn chaining population.
        if (!application) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            })
        };
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//for admin to see the details of total applicants;
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            })
        };
        return res.status(200).json({
            job,
            succees: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: 'status is required.',
                success: false
            })
        };

        const applicant = await Application.findById({ _id: applicationId })
        if (!applicant) {
            return res.status(400).json({
                message: 'application not found.',
                success: false
            })
        };
        console.log(applicant)
        applicant.status = status.toLowerCase();
        applicant.save();
        return res.status(200).json({
            message: "Status updated successfully. ",
            applicant,
            succees: true
        });
    } catch (error) {
        console.log("update status", error)
    }
}