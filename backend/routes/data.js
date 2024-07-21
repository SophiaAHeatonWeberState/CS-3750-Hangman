const express = require("express");

const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will create some data.
recordRoutes.route("/data/add").post(async (req, res) => {
    //console.log(req.body.last, req.body.first);
    try {
        console.log("did it connect?");
        let db_connect = dbo.getDb();
        console.log(db_connect);
        console.log("db_connect worked");
        let myobj = {
            last: req.body.last,
            first: req.body.first,
        };
        const result = await db_connect.collection("records").insertOne(myobj);
        //console.log(result);
        res.json(result);
    } catch (err) {
        throw err;
    }
});

// This section will get a list of all the records.
recordRoutes.route("/data").get(async (req, res) => {
    try {
        console.log("In record get route");
        let db_connect = dbo.getDb();
        const result = await db_connect.collection("records").find({}).toArray();
        console.log("got result");
        res.json(result);
    }
    catch (err) {
        throw err;
    }
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
        randomWord[0].word = randomWord[0].word.toLowerCase();
        res.json(randomWord[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = recordRoutes;
