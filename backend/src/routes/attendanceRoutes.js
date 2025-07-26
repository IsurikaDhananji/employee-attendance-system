const express = require('express');
const { checkIn, checkOut, getMyAttendance, getAllAttendance } = require('../controllers/attendanceController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // Protect all routes after this middleware
router.post('/checkin', checkIn);  
router.post('/checkout', checkOut);
router.get('/my-attendance', getMyAttendance);
router.get('/all', restrictTo('admin'), getAllAttendance); 
module.exports = router;// Only admin can access this route
