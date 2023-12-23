import express from "express"
import { Contact, courseRequest,getDashboardStats } from "../controllers/otherContollers.js";
import { isAuthenticated ,authorizeAdmin} from "../middlewares/auth.js";

const router=express.Router();
router.route("/contact").post(isAuthenticated,Contact)

router.route("/courserequest").post(isAuthenticated,courseRequest)


// Get Admin Dashboard Stats
router
  .route("/admin/stats")
  .get(isAuthenticated, authorizeAdmin, getDashboardStats);


export default router;
