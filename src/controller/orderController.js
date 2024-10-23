const Order = require("../model/orderModel")

//create a new book 
const createOrder = async (req, res) => {
   try {
      const newOrder = await Order({ ...req.body })
      await newOrder.save()
      res.status(201).json(newOrder)
   } catch (error) {
      console.log("Error creating order!", error)
      res.status(500).send({ message: 'Failed to create order!' })
   }
}
// json() is more explicit for sending JSON responses, making your intention clear to developers that you're sending a JSON object.
// send() is more flexible but less explicit about the type of content being sent(although it behaves similarly to json() when given an object).
const getOrderByEmail = async (req, res) => {
   try {
      const { email } = req.params
      const orders = await Order.find({ email }).sort({ createdAt: -1 })
      if (!orders) {
         return res.status(404).json({ message: 'Orders not found!' })
      }
      res.status(200).json(orders)
   } catch (error) {
      console.log("Error fetching orders!", error)
      res.status(500).send({ message: 'Failed to fetch orders!' })
   }
}

module.exports = { createOrder, getOrderByEmail }
