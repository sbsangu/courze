import express from "express"
import { addPlaylist, deleteMyProfile, deleteUser, forgetPassword, getAllUsers, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, updatePassword, updateProfile, updateProfilePicture, updateuserRole} from "../controllers/userController.js";
import { authorizeAdmin,isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router=express.Router(); 

//to register a new user

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/logout").get(logout)



//GET MY PROFILE
router.route("/me").get(isAuthenticated,getMyProfile)


//UPDATE PASSWORD
router.route("/changepassword").put(isAuthenticated,updatePassword)
//UPDATE PROFILE
router.route("/updateprofile").put(isAuthenticated,updateProfile)
//UPDATE PROFILE PICTURE
router.route("/updateprofilepicture").put(isAuthenticated,updateProfilePicture)
//FORGET PASSWORD
router.route("/forgetpassword").post(forgetPassword)

//RESET PASSWORD
router.route("/resetpassword/:token").put(isAuthenticated,resetPassword)

//ADD TO PLAYLIST
router.route("/addtoplaylist").post(isAuthenticated,addPlaylist)


//REMOVE FROM PLAYLIST
router.route("/removeplaylist").delete(isAuthenticated,removeFromPlaylist)

//admin user


router.route("/admin/users").get(isAuthenticated,authorizeAdmin,getAllUsers)

router.route("/admin/user/:id").put(isAuthenticated,authorizeAdmin,updateuserRole).delete(isAuthenticated,authorizeAdmin,deleteUser)

router.route("/me").delete(isAuthenticated,deleteMyProfile)

export default router;