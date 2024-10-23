const Book = require("../model/bookModel")

//frontend => backend server => controller => book schema => database => send to server =>
//create a new book 
const postBook = async (req, res) => {
   try {
      const newBook = await Book({ ...req.body })
      await newBook.save()
      res.status(201).send({ message: 'Book posted successfully!', book: newBook })
   } catch (error) {
      console.log("Error creating book!", error)
      res.status(500).send({ message: 'Failed to create book!' })
   }
}
//get all books 
const getBooks = async (req, res) => {
   try {
      const books = await Book.find().sort({ createdAt: -1 })
      res.status(200).send(books)
   } catch (error) {
      console.log("Error fetching books!", error)
      res.status(500).send({ message: 'Failed to fetch books!' })
   }
}
//get single books 
const getBook = async (req, res) => {
   try {
      const { id } = req.params
      const book = await Book.findById(id)
      if (!book) return res.status(404).send({ message: 'Book not found!' })
      res.status(200).send(book)
   } catch (error) {
      console.log("Error fetching book!", error)
      res.status(500).send({ message: 'Failed to fetch book!' })
   }
}
//update single books 
const updateBook = async (req, res) => {
   try {
      const { id } = req.params
      const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true })
      if (!updatedBook) return res.status(404).send({ message: 'Book not found!' })
      res.status(200).send({
         message: 'Book updated successfully!',
         book: updatedBook
      })
   } catch (error) {
      console.log("Error while updating book!", error)
      res.status(500).send({ message: 'Failed to update book!' })
   }
}
//delete single books 
const deleteBook = async (req, res) => {
   try {
      const { id } = req.params
      const deletedBook = await Book.findByIdAndDelete(id)
      if (!deletedBook) return res.status(404).send({ message: 'Book not found!' })
      res.status(200).send({
         message: 'Book deleted successfully!',
         book: deletedBook
      })
   } catch (error) {
      console.log("Error while deleting book!", error)
      res.status(500).send({ message: 'Failed to delete book!' })
   }
}
module.exports = { postBook, getBooks, getBook, updateBook, deleteBook }