// here mongoose database where fields 
// name
// email
// role
// photo
// dateofbirth-calendar-validation of min. 18 year
// resume -file formatpdf/doc size limit 1mb

const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

// Custom validation to ensure minimum age of 18 years
const validateMinAge = (date) => {
  const age = moment().diff(moment(date), 'years');
  return age >= 18;
};

// Schema definition
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email'],
  },
  role: {
    type: String,
    enum: ['admin', 'employee', 'employer'], // You can add other roles as needed
    default: 'employee',
    required: true
  },
  photo: {
    type: String, // Store the URL or file path of the photo
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: validateMinAge,
      message: 'Employee must be at least 18 years old',
    },
  },
  resume: {
    type: Buffer, // Store the file as a buffer
    required: [true, 'Resume is required'],
    validate: {
      validator: function (value) {
        return value && value.length <= 1024 * 1024; // Check if size <= 1MB
      },
      message: 'Resume file size must be under 1MB',
    },
  },
  resumeFileType: {
    type: String,
    enum: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], // Allowed MIME types
    required: true,
  },
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('User', userSchema);
