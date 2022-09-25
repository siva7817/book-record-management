Book record management API for managin records and books like in a library

## Routes and Endpoints

##API documentation link
https://documenter.getpostman.com/view/18708667/2s83RwkG9p

## /users
POST: create a user
GET: get all the list of users

## /users/{id}
GET: get a user by id
PUT: update a user by id
DELETE: delete a user by id (check if he/she has any book to be issued back) (and if there any fine to be paid)

## /users/subscription-details/{id}
GET: get user dexcription details
1.Date of subscription
2.Valid till
3.fine if any

## /books
GET: get all the books
POST: create or add a new book

## /books/{id}
GET: get a book by id
POST: update a book by id 

## /books/issued
GET: get all issued books

## /books/issued/withFine
GET: all issued books with fine

## subscription types
Basic(3 months)
Standard(6 months)
Premium(9 months)
