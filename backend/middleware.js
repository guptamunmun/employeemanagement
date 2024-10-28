
const multer = require('multer');

// Multer configuration: 1MB size limit, resume file type validation
const upload = multer({
  limits: { fileSize: 1024 * 1024 }, // 1MB limit
  fileFilter(req, file, cb) {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only PDF, DOC, or DOCX files are allowed'));
    }
    cb(null, true);
  },
});

const adminAuth = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next(); // User is authorized
    } else {
      res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  };


module.exports = {upload, adminAuth };
