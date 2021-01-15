const express = require("express");
const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { send } = require("process");
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

// express function and port
const app = express();
const PORT = process.env.PORT || 3005;

// data parsing , public folder connection and json writablility
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

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
      console.log(data);
      const infoBreakDown = JSON.parse(data);
      console.log(infoBreakDown);
      res.send(infoBreakDown);
    }
  });
});

//   add new notes

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  console.log(newNote);

  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    const objData = JSON.parse(data);
    const noteBuild = [...objData, newNote];
    const userNotes = JSON.stringify(noteBuild, null, 7);
    res.send(userNotes);

    fs.writeFile(path.join(__dirname, "db/db.json"), userNotes, (err, res) => {
      if (err) throw err;
    });
  });
});

// delete notes
app.delete("/api/notes/:id", (req, res) => {
  const paramid = req.params.id;
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    err ? console.error(err) : console.log("no error");

    const newData = JSON.parse(data);
    console.log(newData);

    for (let i = 0; i < newData.length; i++) {
      if (newData[i].id === paramid) {
        console.log(newData[i]);
        newData.splice(i, 1);

        const finalData = JSON.stringify(newData, null, 7);

        fs.writeFile(
          path.join(__dirname, "db/db.json"),
          finalData,
          (err, data) => {
            err ? console.err(err) : console.log("no error");
            res.send("sent");
          }
        );
      }
    }
  });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("One could say I'm porting at " + "http://localhost:" + PORT);
});
