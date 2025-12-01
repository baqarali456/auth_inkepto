import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"


const verifyJWT = async(req,res,next) =>{
    try {
        const accessToken = req.cookies?.accessToken || req.headers.authorization?.slice(7);

        if(!accessToken?.trim()){
            return res.status(401).json({message:"Unauthorized access - token missing"});
        }

        const decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);

        console.log("Decoded Token:", decodedToken);

        if(!decodedToken){
            return res.status(401).json({message:"token is not valid"});
        }

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if(!user || (user._id.toString() !== decodedToken._id.toString())){
            return res.status(404).json({message:"User not found"});
        }

        req.user = user;
        next();

    } catch (error) {
        
        return res.status(500).json({message:error.message || "something went wrong while verifying token"});
    }
}

export {
    verifyJWT,
}