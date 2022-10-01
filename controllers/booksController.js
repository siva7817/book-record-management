const IssuedBook = require("../dtos/book-dto");
const bookModel = require("../models/bookmodel");
const userModel = require("../models/usermodel");

const getAllBooks = async (req, res) => {
  const books = await bookModel.find();

  if (books.length === 0) {
    return res.status(404).json({
      status: "failed",
      message: "No book found",
    });
  }

  res.status(200).json({
    status: "success",
    data: books,
  });
};

const getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await bookModel.findById(id);

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
};

const getAllIssuedBooks = async (req, res) => {
  const users = await userModel
    .find({
      issuedBook: { $exists: true },
    })
    .populate("issuedBook");

  const issuedBooks = users.map((each) => new IssuedBook(each));
  console.log(issuedBooks);

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
};

const addNewBook = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(404).json({
      status: "failed",
      message: "No data provided",
    });
  }

  await bookModel.create(data);

  const allBooks = await bookModel.find();

  return res.status(201).json({
    status: "success",
    data: allBooks,
  });
};

const updateBookById = async (req, res) => {
  const { id } = req.params;

  const { data } = req.body;

  const updatedBook = await bookModel.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    {
      new: true,
    }
  );

  return res.status(404).json({
    status: "Success",
    data: updatedBook,
  });
};

module.exports = {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById,
};
