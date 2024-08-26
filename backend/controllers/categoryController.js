const db = require('../models');

const getAllCategories = async (req, res) => {
    try {
        const categories = await db.Category.findAll();

        res.json(categories);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getCategoryById = async (req, res) => {
    try {
        const {category_id} = req.params;

        const category = await db.Category.findOne({
            where: {id: category_id}
        });

        if (!category) {
            res.status(404).send('Category not found');
        }

        res.json(category);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createCategory = async (req, res) => {
    try {
        const {name} = req.body;

        const createCategory = await db.Category.create({
            name, createdAt: new Date(), updatedAt: new Date()
        });

        if (!createCategory) {
            res.status(400).send('Category not created');
        }

        res.status(201).send('Category Created Successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory
};