const express = require("express");
const path = require("path");

// express function and port
const app = express();
const PORT = process.env.PORT || 3000;

// data parsing , public folder connection and json writablility
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// note data (DATA)
const savedNotes = [];

// routes GET, PUT & DELETE

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});
