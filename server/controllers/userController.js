import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto"
import {Course} from "../models/Course.js"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import { Stats } from "../models/Stats.js";


//Register

export const register= catchAsyncError(async (req, res, next) => {
  const { name, email, password, file } = req.body;
  // const file = req.file;
  console.log(name,email,password,file);

  if (!name || !email || !password || !file)
    return next(new ErrorHandler("Please enter all field", 400));

  const user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 409));
  // if(user){
  //   return user.name;
  // }

  // const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(file);

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  sendToken(res, user, "Registered Successfully", 201);
});

//Login



export const login=catchAsyncError (async(req,res,next)=>{

    const {email,password}=req.body;

    if ( !email || !password )
    return next(new ErrorHandler("Please enter all field", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 409));
    

   const isMatch= await user.comparePassword(password);
   
  if (!isMatch) return next(new ErrorHandler("Incorrect Email or Paasword", 401));


   sendToken(res,user,"Welcome back",201)

}
)


export const logout=catchAsyncError(async(req,res,next)=>{

  res.status(200).cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  }).json({
    success:true,
    message:"Logged Out Successfully"
  })
})

export const getMyProfile=catchAsyncError(async(req,res,next)=>{
  const user=await User.findById(req.user._id)
  console.log(user)
  
  res.status(200).json({
    success:true,
    
    user


  })


})

export const updatePassword=catchAsyncError(async(req,res,next)=>{
  const {oldPassword,newPassword}=req.body;
  if(!oldPassword || !newPassword){
    return next(new ErrorHandler("Please Enter All Fields"),400)
  }
  const user=await User.findById(req.user._id).select("+password")
  const isMatch=await user.comparePassword(oldPassword);
  if(!isMatch){
    return next(new ErrorHandler("Incorrect Old Password",400))
  }
  user.password=newPassword;
  await user.save();
  res.status(200).json({
    success:true,user,
    message:"Password Changed Successfully"
  })

})

export const updateProfile=catchAsyncError(async(req,res,next)=>{
  const {name,email}=req.body;
 

  const user=await User.findById(req.user._id)
 if(name){
  user.name=name;
 }
 if(email){
  user.email=email;
 }
  await user.save();
  res.status(200).json({
    success:true,user,
    message:"Profile Changed Successfully"
  })

})

export const updateProfilePicture=catchAsyncError(async(req,res,next)=>{
  const file=req.file;
  const user=await User.findById(req.user._id)
  
  const fileUri=getDataUri(file);
  const myCloud=await cloudinary.v2.uploader.upload(fileUri.content)
  
await cloudinary.v2.uploader.destroy(user.avatar.public_id)
user.avatar={
  public_id:myCloud.public_id,
  url:myCloud.secure_url

}
await user.save(); 

  res.status(200).json({
    success:true,
    message:"Profile Picture Updated Successfully"
  })
  


})




//forget password


export const forgetPassword=catchAsyncError(async(req,res,next)=>{
  const {email}=req.body;
  const user=await User.findOne({email})
  if(!user){
    return next(new ErrorHandler("User Not Found",400))
  }

  const resetToken= await user.getResetToken();
 await user.save();
  //reset token has to be sent ot the email
const url=`${process.env.FRONTED_URL}/resetpassword/${resetToken}`

  const message=`Click on the link to reset password. ${url} ,If you have not requested then please ignore`
   await sendEmail(user.email,"Course Bundler Reset Password",message)


  res.status(200).json({
    success:true,
    message:  `Reset Link  has been sent to ${user.email}`
  })
  


})

//reset password
export const resetPassword=catchAsyncError(async(req,res,next)=>{
  const {token}=req.params;
  const resetPasswordToken=crypto
  .createHash("sha256")
  .update(token)
  .digest("hex")

const user=await User.findOne({resetPasswordToken,
resetPasswordExpire:{
  $gt:Date.now(),
}})
if(!user){
  return next(new ErrorHandler('Token is invalid or has been expired',401))
}
user.password=req.body.password;
user.resetPasswordExpire=undefined;
user.resetPasswordToken=undefined;
await user.save();


  res.status(200).json({
    success:true,
    message: "Password changed successfully"
  })
  


})

//Add to Playlist

export const addPlaylist=catchAsyncError(async(req,res,next)=>{

  const user=await User.findById(req.user._id);
  const course=await Course.findById(req.body._id)
  if(!course){
    return next(new ErrorHandler('Invalid Course Id',404))
  }
const itemExist=user.playlist.find((item)=>{
  if(item.course.toString()===Course._Id.toString()) return true;
})

  if(itemExist) return next(new ErrorHandler("Item Already Exist",409))
  user.playlist.push({
    course:course._id,
    poster:course.poster.url
  })
  await user.save();
  res.status(200).json({
    success:true,
    message:"Added to Playlist",
    
  })

})

export const removeFromPlaylist=catchAsyncError(async(req,res,next)=>{

  const user=await User.findById(req.user._id);
  const course=await Course.findById(req.query._id)
  if(!course){
    return next(new ErrorHandler('Invalid Course Id',404))
  }

  const newPlaylist=user.playlist.filter((item)=>{
    if(item.course.toString()!==course._id.toString()) return item;
  })
  user.playlist=newPlaylist;

    await user.save();
  res.status(200).json({
    success:true,
    message:"Removed from  Playlist",
     
  })

})

export const getAllUsers=catchAsyncError(async(req,res,next)=>{

  const user=await User.find();

  
  res.status(200).json({
    success:true,
   user,
     
  })

})

export const updateuserRole=catchAsyncError(async(req,res,next)=>{
  const {id}=req.params;
  const user=await User.findById(id);
  if(!user){
    return next(new ErrorHandler("User Not  Found",404))
  }
  if(user.role=="user"){
    user.role="admin"
  }else{
    user.role="user"
  }
  await user.save();
res.status(200).json({
  success:true,
  message:"Role Updated"
})

})

export const deleteUser=catchAsyncError(async(req,res,next)=>{
  const {id}=req.params;
  const user=await User.findById(id);
  if(!user){
    return next(new ErrorHandler("User Not  Found",404))
  }
 
await cloudinary.v2.uploader.destroy(user.avatar.public_id)
await user.remove();

res.status(200).json({
  success:true,
  message:"User Removed"
})

})


export const deleteMyProfile = catchAsyncError(async(req,res,next)=>{
  
  const user=await User.findById(req.user._id);
  
 
await cloudinary.v2.uploader.destroy(user.avatar.public_id)
await user.remove()

res.status(200).cookie("token",null,{
  expires:new Date(Date.now()),
  httpOnly:true,
  sameSite:"none"
}).json({
  success:true,
  message:"User Removed"
})

})

User.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);

  const subscription = await User.find({"subscription.status": "active"} );
  stats[0].users =await User.countDocuments();
  stats[0].subscription = subscription.length;
  stats[0].createdAt = new Date(Date.now());

  await stats[0].save();
});
