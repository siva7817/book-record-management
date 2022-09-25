const express = require("express");

const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: get all users
 * Access: Public
 * Parameters: None
 */

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
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
router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: deleting user data
 * Access: Public
 * Parameters: id
 */

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  }

  const index = users.indexOf(user);

  users.splice(index, 1);

  return res.status(202).json({
    status: "Success",
    data: users,
  });
});


//default export
module.exports = router;
