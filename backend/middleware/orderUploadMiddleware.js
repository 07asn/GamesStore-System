const multer = require('multer');
const storage = multer.memoryStorage();

const orderUpload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB limit for payment proofs
        files: 1, // Only one file
        fields: 3 // For payment_method, total_amount, cartItems
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'proof_img' && file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed for payment proof!'), false);
        }
    }
}).single('proof_img'); // Explicitly for single file upload

module.exports = orderUpload;