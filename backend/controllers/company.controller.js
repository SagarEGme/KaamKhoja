import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company Name is required.",
                success: false,
            })
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: `Company with this name ${companyName} is already present.`,
                success: false,
            })
        }
        company = await Company.create({
            name: companyName,
            userId: req.id,
        })
        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })

    } catch (error) {
        console.log("error in registering company", error);
    }
}

export const getCompany = async (req,res)=>{
    try {
        const userId = req.id; //to check if the viewing account is logged in or not because only a logged account can create a company
        const company = await Company.find({userId}); //before it was Company.findOne which was giving only one company details but when changed to find only it showed all compnies.
        if(!company) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "List of companies : ",
            company,
            success: true
        })
    } catch (error) {
        console.log("error in getting company",error);
        
    }
}
export const getCompanyById = async (req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Details about company : ",
            company,
            success: true
        })
    } catch (error) {
        console.log("error in getting company by id",error);
        
    }
}
export const updateCompany = async (req,res)=>{
    try {
        //better logic is shown in user profile update
        const {name,description,website,location} = req.body;
        const updateProfile = {name,description,website,location};

        const company = await Company.findByIdAndUpdate(req.params.id, updateProfile , {new:true});

        if(!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company data updated successfully. ",
            company,
            success: true
        })
    } catch (error) {
        console.log("error in updating company", error);
        
    }
}