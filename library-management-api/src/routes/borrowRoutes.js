const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');

router.post('/', borrowController.borrowBook);
router.get('/', borrowController.getBorrowedBooks);
router.post('/return', borrowController.returnBook);

module.exports = router;
