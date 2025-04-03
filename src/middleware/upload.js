import multer from "multer";

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Export the single file upload middleware
export const uploadSingleFile = upload.single('file');