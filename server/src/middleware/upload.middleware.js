import multer from 'multer';
import path from 'path';

// Setup local storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists or is created on init
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for PDFs and DOCX
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'application/pdf', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and DOCX are allowed.'), false);
  }
};

export const uploadResume = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});
