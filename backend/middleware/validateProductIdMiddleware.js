function validateProductId(req, res, next) {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }
    next();
}

module.exports = validateProductId;