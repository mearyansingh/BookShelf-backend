const express = require('express');
const router = express.Router()
const { postBook, getBooks, getBook, updateBook, deleteBook } = require('../controller/bookController');
const verifyAdminToken = require('../middleware/verifyAdminToken');

// post a book
router.post('/create-book', verifyAdminToken, postBook)
// get all books
router.get('/', getBooks)
// single book endpoint
router.get('/:id', getBook)
// update a book endpoint
router.put('/edit/:id', verifyAdminToken, updateBook)
//delete book
router.delete('/:id', verifyAdminToken, deleteBook)

module.exports = router;