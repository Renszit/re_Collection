const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const key = `&key=${secrets.DISCOGS_KEY}&secret=${secrets.DISCOGS_SECRET}`;

router.get("/searchrecord/:record/:type", function (req, res) {
    const params = req.params.record;
    const type = req.params.type;
    fetch(
        `https://api.discogs.com/database/search?q=${params}&type=${type}${key}`
    )
        .then((response) => response.json())
        .then((json) => {
            res.json(json);
        });
});

router.get("/getrecord/:selection/:type", (req, res) => {
    const selection = req.params.selection;
    const type = req.params.type;
    console.log("type and selection:", type, selection);
    if (type == "release") {
        fetch(`https://api.discogs.com/masters/${selection}${key}`)
            .then((response) => response.json())
            .then((json) => res.json(json));
    } else if (type == "artist") {
        fetch(`https://api.discogs.com/artists/${selection}${key}`)
            .then((response) => response.json())
            .then((json) => res.json(json));
    } else if (type == "label") {
        fetch(`https://api.discogs.com/labels/${selection}${key}`)
            .then((response) => response.json())
            .then((json) => res.json(json));
    } else {
        console.log("huh?");
    }
});

module.exports = router;
