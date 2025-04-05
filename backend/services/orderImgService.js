const cloudinary = require('../config/cloudinary');

exports.uploadPaymentProof = async (file) => {
    if (!file || !file.buffer) {
        throw new Error('No valid file provided for payment proof');
    }

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'payment_proofs',
                resource_type: 'image',
                format: 'jpg',
                quality: 'auto:good'
            },
            (error, result) => {
                if (error) {
                    console.error('Payment proof upload error:', error);
                    reject(new Error('Failed to upload payment proof'));
                } else {
                    resolve({
                        url: result.secure_url,
                        public_id: result.public_id
                    });
                }
            }
        );

        uploadStream.on('error', (e) => {
            console.error('Payment proof stream error:', e);
            reject(new Error('Payment proof upload failed'));
        });

        const bufferStream = new require('stream').PassThrough();
        bufferStream.end(file.buffer);
        bufferStream.pipe(uploadStream);
    });
};