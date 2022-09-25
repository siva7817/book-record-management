const express = require("express");

//importing routes
const userRouter = require("./Routes/users");
const booksRouter = require("./Routes/books");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is on and running",
  });
});

app.use('/users', userRouter)
app.use('/books', booksRouter)

app.get("*", (req, res) => {
  res.status(404).json({
    message: "this route doesnt exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
