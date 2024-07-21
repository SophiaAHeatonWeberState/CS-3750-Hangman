const express = require("express");

const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// here is the start of the session plus username setting
recordRoutes.route("/session_start").post(async (req, res) => {
    try{
        const name = req.body.name;
    if (!name) {
        return res.status(301).json("You must input a username before playing.");
    }
    req.session.name = name;
    res.status(200).json("username has been set to session.");
    }
	catch (err) {
        throw err;
        }   
});

// here is the deletion of the session
recordRoutes.route("/session_end").get(async (req, res) => {
	req.session.destroy();
	let status = "session destroyed";
	const resultObj = { status: status };
	res.json(resultObj);
});

recordRoutes.route("/random-word").get(async (req, res) => {
    try {
        console.log("Trying to connect to db");
        let db_connect = dbo.getDb();
        const collection = db_connect.collection("Words");

        const count = await collection.countDocuments();
        if (count === 0) {
            return res.status(404).json({ message: 'No words found' });
        }

        const randomIndex = Math.floor(Math.random() * count);

        const randomWord = await collection.find().skip(randomIndex).limit(1).toArray();
        const word = randomWord[0].word.toLowerCase();
        res.json(word);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = recordRoutes;
