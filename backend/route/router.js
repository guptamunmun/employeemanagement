const express = require('express');
const router = express.Router();
const {
  createEmployee,
  deleteEmployee,
  updateEmployeeProfile,
} = require('../controller/EmployeeController');
const {upload, adminAuth} = require('../middleware.js');
// Multer for file uploads

// Create an employee (Admin Only)
router.post('/employees', adminAuth, createEmployee);

// Delete an employee (Admin Only)
router.delete('/employees/:employeeId', adminAuth, deleteEmployee);

// Update employee profile (Employee only)
router.put(
  '/employees/profile',
  upload.single('resume'), // Handle single resume upload
  updateEmployeeProfile
);

module.exports = router;
