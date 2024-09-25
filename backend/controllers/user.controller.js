import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message:"Some input credential is missing.",
                success:false
            });
        }
        const file=req.file;

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
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
            user,
            sucesss:true,
        })

        } catch (error) {
            console.log("error in registering, ", error);

        }
    }
export const login = async (req,res)=>{
    const {email,password,role} = req.body;
    if(!email || !password || !role){
        return res.status(400).json({
            message:"Some Input is missing.",
            success:false,
        })
    }
    let user = await User.findOne({email}); //before it was const which couldn't be changed further but since it is changed to let we can manipulate it later in our code.
    //never forget to use await in such fetching or finding situation. It took 5 min to debug it.
    if(!user) {
        return res.status(400).json({
            message:"No Account with given email found",
            success:false,
        })
    }
    const isPasswordMatched = await bcrypt.compare(password,user.password);
    if(!isPasswordMatched){
        return res.json({
            message:"password not matched",
            success:false,
        })
    }
    if(role != user.role){
        return res.json({
            message:"Role doesn't match with your account's role."
        })
    }
    const tokenData = {
        userId : user._id,
    }
    const token = await jwt.sign(tokenData,process.env.SECRET_KEY , {expiresIn:'1d'});
    user = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
    }

    return res.status(200).cookie("token", token, {maxAge : 1*24*60*60*1000 , httpsOnly:true, sameSite:"strict"}).json({
        message:`welcome back ${user.fullName}`,
        user, // we are using the same name as in findOne object and the value of this user will be shown in postman along with json message and success. It wasn't compulsary to write but to analyze the db data we used this.
        success:true,
    })

}
export const logout = (req,res)=>{
    return res.cookie("token","",{maxAge:'0'}).json({
        message:"logged out successfully",
        success:true,
    })
}

export const updateProfile = async(req,res)=>{
    try {
        const {fullName,email,phoneNumber,bio,skills} = req.body;
        let skillsArray;
        if(skills) skillsArray = skills.split(",");

        const file = req.file;
        const userId = req.id; // know its explanation later
        let user = await User.findById(userId);

        if(!user) {
            return res.status(400).json({
                message:"user not found",
                success:false,
            })
        }

        //updating data
        if(fullName) user.fullName = fullName
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        await user.save(); //after changing the data values we need to use dataname.save() function.

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true,
        })

    } catch (error) {
        console.log("error in update profile", error)
    }
}