const express = require("express");
const path = require("path");
const fs = require("util");
const util = require("util");
const uuid = require("uuid");
const router = express.Router();

// api reads json file and returns saved notes
router.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Cannot read file");
    }

    try {
      const notes = JSON.parse(data);
      res.json(notes);
    } catch (err) {
      console.error(err);
      res.status(500).json("Error handling the JSON data");
    }
  });
});

// notes api should get a new note to save and then add it into db.json

router.post("/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4();

  fs,
    readFuke("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Cannot read new note");
      }

      try {
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json("Cannot write the new note");
          }
          res.json(newNote);
        });
      } catch (err) {
        console.error(err);
        res.status(500).json("Error handling the JSON data");
      }
    });
});

module.exports = router;
