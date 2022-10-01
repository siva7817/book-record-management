const express = require("express");
const { getAllBooks, getSingleBookById, getAllIssuedBooks } = require("../controllers/booksController");
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

router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(404).json({
      status: "failed",
      message: "No data provided",
    });
  }

  const book = books.find((each) => each.id === data.id);

  if (book) {
    return res.status(404).json({
      status: "failed",
      message: "Book already existed with this id",
    });
  }

  const allBooks = [...books, data];

  return res.status(201).json({
    status: "success",
    data: allBooks,
  });
});

/**
 * Route: /books/:id
 * Method: PUT
 * Description: update book
 * Access: Public
 * Parameters: id
 * Data: author, name, genre, price, publisher, id
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;

  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      status: "failed",
      message: "Book not found with this id",
    });
  }

  const updateData = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });

  return res.status(404).json({
    status: "Success",
    data: updateData,
  });
});

//default export
module.exports = router;
