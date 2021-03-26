const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

var Discogs = require("disconnect").Client;

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

let reqdata = "";

router.get("/authorize", function (req, res) {
    var oAuth = new Discogs().oauth();
    oAuth.getRequestToken(
        secrets.DISCOGS_KEY,
        secrets.DISCOGS_SECRET,
        "http://localhost:3000/callback",
        function (err, requestData) {
            reqdata = requestData;
            // Persist "requestData" here so that the callback handler can
            // access it later after returning from the authorize url
            res.redirect(requestData.authorizeUrl);
        }
    );
});

let access;
router.get("/callback", function (req, res) {
    console.log(req.data);
    var oAuth = new Discogs(reqdata).oauth();
    oAuth.getAccessToken(
        req.query.oauth_verifier, // Verification code sent back by Discogs
        function (err, accessData) {
            access = accessData;
            // Persist "accessData" here for following OAuth calls
            // res.send("Received access token!");
        }
    );
});

router.get("/searchrecord/:record", function (req, res) {
    const param = req.params.record;
    console.log(param);
    fetch(`/database/search?q=${param}&{?`);
    var dis = new Discogs(access);
    dis.getIdentity(function (err, data) {
        console.log(data);
        res.send(data);
    });
});

module.exports = router;
