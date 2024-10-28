// const create employee authorisation by admin 
// const delet employee authorisation by admin 


// function update employee where employee can update resume nd photo 

const User = require('../model/EmployeeModel');
require('dotenv').config(); 

// Create Employee (Admin Only)
const createEmployee = async (req, res) => {
  try {
    const { name, email, dateOfBirth, role } = req.body;

    const newEmployee = new User({
      name,
      email,
      dateOfBirth,
      role: role || 'employee', // Default role is 'employee'
    });

    await newEmployee.save();

    let token ;
    if(newEmployee.role === "admin"){
        token = jwt.sign(
            {userId:newEmployee._id, role: newEmployee.role },
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

    }
    res.status(201).json({ message: 'Employee created successfully', newEmployee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Employee (Admin Only)
const deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await User.findByIdAndDelete(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Employee Profile (Resume & Photo)
const updateEmployeeProfile = async (req, res) => {
  try {
    const { userId } = req.user; // Assume the logged-in user's ID is in req.user
    const updates = {};

    if (req.file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];

      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: 'Invalid resume format' });
      }

      updates.resume = req.file.buffer;
      updates.resumeFileType = req.file.mimetype;
    }

    if (req.body.photo) {
      updates.photo = req.body.photo; // Store photo URL or path
    }

    const updatedEmployee = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', updatedEmployee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createEmployee, deleteEmployee, updateEmployeeProfile };
