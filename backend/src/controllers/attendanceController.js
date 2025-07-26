const Attendance = require('../models/Attendance');
const User = require('../models/User');

const checkIn = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already checked in today
    const existingRecord = await Attendance.findOne({
      employee: employeeId,
      date: { $gte: today }
    });

    if (existingRecord) {
      return res.status(400).json({
        status: 'fail',
        message: 'You have already checked in today'
      });
    }

    // Create new attendance record
    const attendance = await Attendance.create({
      employee: employeeId,
      checkIn: new Date(),
      date: new Date()
    });

    await attendance.populate('employee', 'name employeeId');

    res.status(201).json({
      status: 'success',
      data: {
        attendance
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

const checkOut = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's attendance record
    const attendance = await Attendance.findOne({
      employee: employeeId,
      date: { $gte: today },
      status: 'checked-in'
    });

    if (!attendance) {
      return res.status(400).json({
        status: 'fail',
        message: 'No check-in record found for today'
      });
    }

    // Update check-out time
    attendance.checkOut = new Date();
    attendance.status = 'checked-out';
    attendance.calculateHours();
    await attendance.save();

    await attendance.populate('employee', 'name employeeId');

    res.status(200).json({
      status: 'success',
      message: 'Checked out successfully!',
      data: {
        attendance
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

const getMyAttendance = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const attendance = await Attendance.find({ employee: employeeId })
      .populate('employee', 'name employeeId')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Attendance.countDocuments({ employee: employeeId });

    res.status(200).json({
      status: 'success',
      results: attendance.length,
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: {
        attendance
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

const getAllAttendance = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const attendance = await Attendance.find()
      .populate('employee', 'name employeeId email')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Attendance.countDocuments();

    res.status(200).json({
      status: 'success',
      results: attendance.length,
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: {
        attendance
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

module.exports = {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance
};