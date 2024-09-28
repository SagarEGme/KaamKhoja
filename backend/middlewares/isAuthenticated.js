import jwt from "jsonwebtoken"

const isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false,
            })
        }
        const decodedTokenData = await jwt.verify(token,process.env.SECRET_KEY);
        if(!decodedTokenData){
            return res.status(401).json({
                message:"not valid token.",
                success:false,
            })
        }
        req.id = decodedTokenData.userId;
        next();
    } catch (error) {
        console.log("error in authentication", error);
    }
}

export default isAuthenticated;