const express = require("express");

const {
  getAllUsers,
  getSingleUserById,
  deleteUserById,
  updateUserById,
  createNewUser,
  getSubscriptionDetailsById,
} = require("../controllers/userController");

const { users } = require("../data/users.json");

const bookModel = require("../models/bookmodel");
const userModel = require("../models/usermodel");

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: get all users
 * Access: Public
 * Parameters: None
 */

router.get("/", getAllUsers);

/**
 * Route: /users/:id
 * Method: GET
 * Description: get single user by id
 * Access: Public
 * Parameters: id
 */

router.get("/:id", getSingleUserById);

/**
 * Route: /users
 * Method: POST
 * Description: create new user
 * Access: Public
 * Parameters: none
 */
router.post("/", createNewUser);

/**
 * Route: /users/:id
 * Method: PUT
 * Description: updating user data
 * Access: Public
 * Parameters: id
 */

router.put("/:id", updateUserById);

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: deleting user data
 * Access: Public
 * Parameters: id
 */

router.delete("/:id", deleteUserById);

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: getting user subscription details with id
 * Access: Public
 * Parameters: id
 */

router.get("/subscription-details/:id", getSubscriptionDetailsById);

//default export
module.exports = router;
