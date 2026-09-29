const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!password || !username) {
        return res.status(400).json({ message: "Username and password required" });
    }

    if (isValid(username)) {
        return res.status(409).json({ message: "Username already exists" })
    }

    users.push({ username: username, password: password })

    return res.status(201).json(books)

});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    return res.status(200).json(books)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    if (books[isbn]) {
        return res.status(200).json(books[isbn]);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const author = req.params.author;

    const result = getBooksByAuthor(req.params.author)

    if (result.length !== 0) {
        return res.status(200).json(result)
    }

    return res.status(404).json({ message: "No books found by this author" })
});

const getBooksByAuthor = (author) => {
    let result = {};

    let booksByAuthor = Object.entries(books).filter(([key, book]) =>
        book.author.toLowerCase() === author.toLowerCase()
    );
    if (booksByAuthor.length > 0) {
        booksByAuthor.forEach(([key, book]) => {
            result[key] = book;
        });
        return result
    }
}

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
