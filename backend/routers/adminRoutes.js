const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

const {
  adminLoginController,
  adminResetPasswordController,
  deleteCourseController,
  deleteUserController,
  getAllCoursesController,
  getAllEnrolledCoursesController,
  getAllUsersController,
} = require("../controllers/adminController");

const {
  getAdminPaymentsController,
} = require("../controllers/paymentRecordsController");

const router = express.Router();

router.post("/login", adminLoginController);

router.get(
  "/getallusers",
  authMiddleware,
  checkRole(["admin"]),
  getAllUsersController,
);

router.get(
  "/enrolled-courses",
  authMiddleware,
  checkRole(["admin"]),
  getAllEnrolledCoursesController,
);

router.get(
  "/payments",
  authMiddleware,
  checkRole(["admin"]),
  getAdminPaymentsController,
);

router.get(
  "/getallcourses",
  authMiddleware,
  checkRole(["admin"]),
  getAllCoursesController,
);

router.delete(
  "/deletecourse/:courseid",
  authMiddleware,
  checkRole(["admin"]),
  deleteCourseController,
);

router.delete(
  "/deleteuser/:userid",
  authMiddleware,
  checkRole(["admin"]),
  deleteUserController,
);

router.post(
  "/reset-password/:userid",
  authMiddleware,
  checkRole(["admin"]),
  adminResetPasswordController,
);

module.exports = router;
