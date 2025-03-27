const cloudinary = require('../config/cloudinary');

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const fileBuffer = req.file.buffer;

        cloudinary.uploader.upload_stream(
            { folder: 'categories' },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({ message: 'Cloudinary upload failed', error });
                }
                console.log('Cloudinary result:', result); // Log the result to see the image URL
                return res.status(200).json({ image_url: result.secure_url });
            }
        ).end(fileBuffer);

    } catch (error) {
        console.error('Upload Image error:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};
