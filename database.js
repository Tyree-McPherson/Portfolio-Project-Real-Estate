const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Importing all the schemas.
const listingSchema = require("./project-0-listing");

mongoose.connect(process.env.databaseUrl, {
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;

// Main databse connection.
const db = mongoose.connection;

// Connection to the collection.
const collection0 = db.collection("project-0");

module.exports = router;