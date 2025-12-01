import { User } from "../models/user.model.js";


const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log(req.body);

        if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({ message: "All fields are required" });
        
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }

       const user = await User.create({
            firstName,
            lastName,
            email,
            password,
        })

        return res.status(201).json({
            message: "User registered successfully",
            user,});

    } catch (error) {
        
        return res.status(500).json({ message: error.message || "something went wrong while registering user", });
    }
}


const generateAccessandRefreshToken = async(userId) =>{
        try {
           const user = await User.findById(userId)
           const accessToken = user.generateAccessToken()
           const refreshToken = user.generateRefreshToken()
           user.refreshToken = refreshToken;

           await user.save({validateBeforeSave:false})

           return [accessToken,refreshToken]

        } catch (error) {
            throw error;
        }
}


const loginUser = async (req, res) => {

    try {
        const {email,password} = req.body;

        if(!email?.trim() || !password?.trim()){
            return res.status(400).json({message:"Email and password are required"});
        }


        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const isValidPassword = await user.comparePassword(password);

        if(!isValidPassword){
            return res.status(401).json({message:"Invalid password"});
        }

        const [accessToken,refreshToken] = await generateAccessandRefreshToken(user._id)

        const loggedInUser = await User.findById(user._id);


        return res
        .status(200)
        .cookie('accessToken',accessToken,{httpOnly:true,secure:true})
        .cookie('refreshToken',refreshToken,{httpOnly:true,secure:true})
        .json(
            {
                message:"User logged in successfully",
                user:loggedInUser,
                accessToken,
                refreshToken,
            }
        )





    } catch (error) {
        return res.status(500).json({message:error.message || "something went wrong while logging in user"});
    }
}


const getUserDetails = async(req,res) =>{
     try {
        const user = await User.findById(req.user._id).select("-password -refreshToken");
        return res.status(200).json({userDetails:user});
     } catch (error) {
        return res.status(500).json({message:error.message || "something went wrong while fetching user details"});
     }
}

const logoutUser = async(req,res) =>{
    try {
        await User.findByIdAndUpdate(
            req.user?._id,
            { $unset: { refreshToken: 1 } },
            { new: true}
        )

        return res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json({message:"User logged out successfully"});
    }

    catch (error) {

        return res.status(500).json({message:error.message || "something went wrong while logging out user"});
    }
};


export {
    loginUser,
    registerUser,
    getUserDetails,
    logoutUser,
}