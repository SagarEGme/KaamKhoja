import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message:"Some input credential is missing.",
                success:false
            });
        }

        const user = await User.findOne({email});
        if(user){
            return res.json(400).json({
                message:"user already exist with this email",
                success:false,
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await User.create({
            fullName,
            email,
            phoneNumber,
            password : hashedPassword,
            role,
            profile:{
                //will be filled later
            }
        })

        return res.status(201).json({
            message:"Accoount created successfully.",
            sucesss:true,
        })

        } catch (error) {
            console.log("error in registering, ", error);

        }
    }