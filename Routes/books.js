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
