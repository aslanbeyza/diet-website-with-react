const db = require('../models');

const getAllProducts = async (req, res) => {
    try {
        const products = await db.Product.findAll();

        res.json(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getProductById = async (req, res) => {
    try {
        
        const {product_id} = req.params;
        console.log(product_id);

        const product = await db.Product.findOne({
            where: {id: product_id}
        });

        if (!product) {
            res.status(404).send('Product not found');
        }

        res.json(product);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createProduct = async (req, res) => {
    try {
        const {name, short_explanation, slug, photo_src, comment_count, average_star} = req.body;

        const createProduct = await db.Product.create({
            name,
            short_explanation,
            slug,
            photo_src,
            comment_count,
            average_star,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        if (!createProduct) {
            res.status(400).send('Product not created');
        }

        res.status(201).send('Product Created Successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct
};