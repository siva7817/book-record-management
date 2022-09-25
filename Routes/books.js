const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /
 * Method: GET
 * Description: get all books
 * Access: Public
 * Parameters: none
 */

router.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    data: books,
  });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: getting book by id
 * Access: Public
 * Parameters: id
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      status: "failed",
      message: "Book not found",
    });
  }

  return res.status(200).json({
    status: "success",
    data: book,
  });
});

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: getting all issued books
 * Access: Public
 * Parameters: none
 */

router.get("/issued/by-user", (req, res) => {
  const userWithIssuedBooks = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];

  userWithIssuedBooks.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });

  if (issuedBooks.length === 0) {
    return res.status(404).json({
      status: "failed",
      message: "No books issued yet",
    });
  }
  return res.status(200).json({
    status: "Success",
    data: issuedBooks,
  });
});

//default export
module.exports = router;
