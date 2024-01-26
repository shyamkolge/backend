import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponce } from '../utils/ApiResponce.js'

const registerUser = asyncHandler( async (req, res ) => {

    // get user details from frontend.
    // validation 
    // check if user already exists 
    // check for images and avatar
    // upload on cloudinary , avatar 
    // create user objects - create entry in DB
    // remove password and refreshtoken from responce 
    // check for user creation 
    // return res 

    const {username, email, fullName, password } = req.body;
     
    if (
         [username, email, fullName, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400 , "All fields are required")
    }

    const existedUser = User.findOne({
        $or : [{username} , {email}]
    })

    if (existedUser) throw new ApiError(409 , "User already exists")

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImgLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
       throw new ApiError(400, "Avatar Image is required.")
    }

   const avatar =  await uploadOnCloudinary(avatarLocalPath);
   const coverImage = await uploadOnCloudinary(coverImgLocalPath);

   if (!avatar) throw new ApiError(400, "Avatar Image is required.");

  const user = await User.create({
         fullName,
         avatar : avatar.url,
         coverImage : coverImage?.url || "",
         password,
         username : username.toLowercase()
   })

   const userCreated = await User.findById(user._id).select(
      "-password -refreshToken"
   )

   if (!userCreated) {
      throw new ApiError(500 , "Something went wrong while creating User..!")
    
   }

   return res.status(201).json(
     new ApiResponce(200, userCreated, "User register successfully" )
   )



})

export {
    registerUser,
}