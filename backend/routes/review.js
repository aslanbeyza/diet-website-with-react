const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getAllReviews);
router.get('/:review_id', reviewController.getReviewById);
router.post('/', reviewController.createReview);

module.exports = router;