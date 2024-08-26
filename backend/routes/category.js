const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllCategories);
router.get('/:category_id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);

module.exports = router;