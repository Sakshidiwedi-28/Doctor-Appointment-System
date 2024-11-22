const express = require("express");
const { 
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDocotrsController,
    bookeAppointmnetController,
    bookingAvailabilityController,
    userAppointmentsController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
    
const router = express.Router();

// Auth routes
router.post('/login', loginController);
router.post('/register', registerController);
router.get('/get-user-data', authMiddleware, authController);

// Doctor related routes
router.post('/apply-doctor', authMiddleware, applyDoctorController);
router.get('/get-all-doctors', authMiddleware, getAllDocotrsController);

// Notification routes
router.post('/get-all-notification', authMiddleware, getAllNotificationController);
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);

// Appointment routes
router.post('/book-appointment', authMiddleware, bookeAppointmnetController);
router.post('/booking-availability', authMiddleware, bookingAvailabilityController);
router.get('/user-appointments', authMiddleware, userAppointmentsController);

module.exports = router;
