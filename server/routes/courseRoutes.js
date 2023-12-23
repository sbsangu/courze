import express from "express"
import {addLecture, createCourse,deleteCourse,deleteLecture,getAllCourses, getCourseLectures} from "../controllers/courseController.js";
import { authorizeAdmin, authorizeSubscriber, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
const router=express.Router(); 

router.get("/courses",getAllCourses);


router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

//add lecture
router
.route("/courses/:id")
.get(isAuthenticated, authorizeSubscriber,getCourseLectures)
.post(isAuthenticated,authorizeAdmin,singleUpload,addLecture)
.delete(isAuthenticated,authorizeAdmin,deleteCourse)

//delete course

//get course details

//delete lecture by admin
router.route("/lecture").delete(isAuthenticated,authorizeAdmin,deleteLecture)

export default router;