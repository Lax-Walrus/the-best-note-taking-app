const express = require("express");
const path = require("path");
const fs = require("fs");

// express function and port
const app = express();
const PORT = process.env.PORT || 3005;

// data parsing , public folder connection and json writablility
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// note data (DATA)
const savedNotes = [];
const savedTitle = [];

// routes for html

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// routes for API

// read past notes

app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log("no error");
      const parseData = JSON.parse(data);
      res.send(parseData);
    }
  });
});

//   add new notes

app.post("/api/notes", (req, res) => {
  const newNote = req.body;

  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log("no error");
      const objData = JSON.parse(data);
      const noteBuild = [...objData, newNote];
      const userNotes = JSON.stringify(noteBuild);

      fs.writeFile(
        path.join(__dirname, "db/db.json"),
        userNotes,
        (err, res) => {
          if (err) throw err;
        }
      );
    }
  });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("One could say I'm porting at " + "http://localhost:" + PORT);
});
