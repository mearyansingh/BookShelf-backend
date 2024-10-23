const express = require('express');
const router = express.Router()
const { createOrder, getOrderByEmail } = require('../controller/orderController');

//create order
router.post("/", createOrder)
router.get("/email/:email", getOrderByEmail)

module.exports = router;