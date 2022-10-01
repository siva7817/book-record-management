const express = require("express");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById,
} = require("../controllers/booksController");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const bookModel = require("../models/bookmodel");
const userModel = require("../models/usermodel");

const router = express.Router();

/**
 * Route: /
 * Method: GET
 * Description: get all books
 * Access: Public
 * Parameters: none
 */

router.get("/", getAllBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: getting book by id
 * Access: Public
 * Parameters: id
 */

router.get("/:id", getSingleBookById);

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: getting all issued books
 * Access: Public
 * Parameters: none
 */

router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route: /books
 * Method: POST
 * Description: create new book
 * Access: Public
 * Parameters: none
 * Data: author, name, genre, price, publisher, id
 */

router.post("/", addNewBook);

/**
 * Route: /books/:id
 * Method: PUT
 * Description: update book
 * Access: Public
 * Parameters: id
 * Data: author, name, genre, price, publisher, id
 */

router.put("/:id", updateBookById);

//default export
module.exports = router;
