const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

router.get("/searchrecord/:record", function (req, res) {
    const params = req.params.record;
    fetch(
        `https://api.discogs.com/database/search?q=${params}&key=${secrets.DISCOGS_KEY}&secret=${secrets.DISCOGS_SECRET}`
    )
        .then((response) => response.json())
        .then((json) => {
            res.json(json);
        });
});

module.exports = router;
