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

module.exports = recordRoutes;
