const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsersController,
  getAllCoursesController,
  deleteCourseController,
  deleteUserController,
} = require("../controllers/adminController");

const checkRole = require("../middlewares/roleMiddleware");

const router = express.Router();

// Admin login route (no auth middleware)
const { adminLoginController } = require("../controllers/adminController");
router.post("/login", adminLoginController);


router.get("/getallusers", authMiddleware, checkRole(["admin"]), getAllUsersController);
router.get("/enrolled-courses", authMiddleware, checkRole(["admin"]), require("../controllers/adminController").getAllEnrolledCoursesController);
router.get("/payments", authMiddleware, checkRole(["admin"]), require("../controllers/adminController").getAllPaymentsController);

router.get("/getallcourses", authMiddleware, checkRole(["admin"]), getAllCoursesController);

router.delete('/deletecourse/:courseid', authMiddleware, checkRole(["admin"]), deleteCourseController)

router.delete('/deleteuser/:cuserid', authMiddleware, checkRole(["admin"]), deleteUserController)

// Admin reset user password
router.post('/reset-password/:userid', authMiddleware, checkRole(["admin"]), require("../controllers/adminController").adminResetPasswordController)

module.exports = router;
