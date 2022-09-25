const express = require("express");
const { users } = require("./data/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is on and running",
  });
});
/**
 * Route: /users
 * Method: GET
 * Description: get all users
 * Access: Public
 * Parameters: None
 */

app.get("/users", (req, res) => {
  res.status(200).json({
    status: "success",
    data: users,
  });
});

/**
 * Route: /users/:id
 * Method: GET
 * Description: get single user by id
 * Access: Public
 * Parameters: id
 */

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "user not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

/**
 * Route: /users
 * Method: POST
 * Description: create new user
 * Access: Public
 * Parameters: none
 */
app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((each) => each.id === id);

  if (user) {
    return res.status(404).json({
      status: "failed",
      message: "User exists with id",
    });
  }

  console.log(user);

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(201).json({
    status: "Success",
    data: users,
  });
});

/**
 * Route: /users/:id
 * Method: PUT
 * Description: updating user data
 * Access: Public
 * Parameters: id
 */

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id === id);

  if (!user)
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });

  const updatedUser = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });

  return res.status(201).json({
    status: "success",
    data: users,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "this route doesnt exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
