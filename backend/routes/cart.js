const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { userId, productId, quantity } = req.body;
    // In a real app, store cart in database; here, we'll just return the data
    res.json({ userId, productId, quantity });
});

router.get('/:userId', (req, res) => {
    // Fetch cart from database; for simplicity, return empty for now
    res.json([]);
});

module.exports = router;