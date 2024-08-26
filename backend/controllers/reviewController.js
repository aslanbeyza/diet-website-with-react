const db = require('../models');

const getAllReviews = async (req, res) => {
    try {
        const reviews = await db.Review.findAll();

        res.json(reviews);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getReviewById = async (req, res) => {
    try {
        const {review_id} = req.params;

        const review = await db.Review.findOne({
            where: {id: review_id}
        });

        if (!review) {
            res.status(404).send('Review not found');
        }

        res.json(review);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createReview = async (req, res) => {
    try {
        const {rating, description, productId, userId} = req.body;

        const createReview = await db.Review.create({
            rating,
            description,
            productId,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        if (!createReview) {
            res.status(400).send('Review not created');
        }

        res.status(201).send('Review Created Successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllReviews,
    getReviewById,
    createReview
};