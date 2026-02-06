const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (file, folder = 'interior-design') => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder,
            resource_type: 'auto',
            transformation: [
                { quality: 'auto' },
                { fetch_format: 'auto' }
            ]
        });
        return result;
    } catch (error) {
        throw new Error(`Cloudinary upload failed: ${error}`);
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        throw new Error(`Cloudinary delete failed: ${error}`);
    }
};

const uploadMultipleToCloudinary = async (files, folder = 'interior-design') => {
    try {
        const uploadPromises = files.map(file => uploadToCloudinary(file, folder));
        return await Promise.all(uploadPromises);
    } catch (error) {
        throw new Error(`Multiple upload failed: ${error}`);
    }
};

const getOptimizedUrl = (publicId, options = {}) => {
    return cloudinary.url(publicId, {
        width: options.width,
        height: options.height,
        crop: options.crop || 'fill',
        quality: options.quality || 'auto',
        fetch_format: 'auto',
    });
};

module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary,
    uploadMultipleToCloudinary,
    getOptimizedUrl,
};
