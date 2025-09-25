const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};
        if (category) query.category = category;
        if (search) query.name = { $regex: search, $options: 'i' };
        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;