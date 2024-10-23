const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()

//routes
const bookRoutes = require('./src/routes/books')
const orderRoutes = require('./src/routes/orders')
const userRoutes = require('./src/routes/user')
const adminRoutes = require('./src/routes/adminStats')

const app = express()
app.use(express.json())
app.use(cors({
   origin: ['http://localhost:5173', 'https://bookshelfstore.vercel.app'], // replace with your domain
   credentials: true, // enable cookies
}))

const port = process.env.PORT || 5000

//routes
app.use('/api/books', bookRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/admin', adminRoutes)

async function main() {
   await mongoose.connect(process.env.MONGODB_URL);
   app.get('/', (req, res) => {
      res.send('Welcome to BookShelf!')
   })
}
main().then(() => console.log("mongodb connected successfully!")).catch((err) => {
   console.log("Failed to connect to MongoDB, retrying in 5 seconds...", err)
   setTimeout(main, 5000);
});
app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})