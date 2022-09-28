const express = require("express");
const dotenv = require("dotenv");

//DB Connection
const DbConnection = require("./databaseConnection");

//importing routes
const userRouter = require("./Routes/users");
const booksRouter = require("./Routes/books");

dotenv.config();

const app = express();

DbConnection();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is on and running",
  });
});

app.use("/users", userRouter);
app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "this route doesnt exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT} ...`);
});
