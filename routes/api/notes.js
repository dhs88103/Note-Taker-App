const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const uuid = require("uuid");
const router = express.Router();

// GET /api/notes should read the db.json file and return all saved notes as JSON.
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
// POST /api/notes should receive a new note to save on the request body, add it to the db.json file,
router.post("/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4();

  fs.readFile("./db/db.json", "utf8", (err, data) => {
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
          return res.status(500).json("Cannot write new note");
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
