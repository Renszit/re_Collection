const express = require("express");
const router = express.Router();
const { hash, compare } = require("./bc");
const db = require("./db");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");

router.post("/register", (req, res) => {
    const { first, last, email, password } = req.body;
    hash(password)
        .then((hashedpass) => {
            db.addUser(first, last, email, hashedpass)
                .then(({ rows }) => {
                    console.log("registration worked:", rows);
                    req.session.userId = rows[0].id;
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log(
                        "something went wrong in the register post route",
                        err
                    );
                    res.json({ error: true });
                });
        })
        .catch((err) => {
            console.error("error in hashing password", err);
            res.json({ error: true });
        });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.getHash(email)
        .then(({ rows }) => {
            // console.log(rows);
            const { pass: hash, id: userId } = rows[0];
            compare(password, hash).then((result) => {
                if (result) {
                    req.session.userId = userId;
                    res.json({ success: true });
                } else {
                    res.json({ error: true });
                }
            });
        })
        .catch((err) => {
            console.error("login get hash failed", err);
            res.json({ error: true });
        });
});

router.post("/password/reset/start", (req, res) => {
    const { email } = req.body;
    const secretCode = cryptoRandomString({
        length: 6,
    });
    console.log(req.body);
    db.getHash(email)
        .then(() => {
            db.addSecretCode(email, secretCode)
                .then(() => {
                    sendEmail(email, secretCode, "Here is your secret code!")
                        .then(() => {
                            res.json({ state: 2 });
                        })
                        .catch((err) => {
                            console.error("error in sending email:", err);
                            res.json({ error: true });
                        });
                })
                .catch((err) => {
                    console.log("error in adding secret code", err);
                    res.json({ error: true });
                });
        })
        .catch((err) => {
            console.error("email does not exists", err);
            res.json({ error: true });
        });
});

router.post("/password/reset/verify", (req, res) => {
    const { email, code, password } = req.body;
    db.checkCode(email, code)
        .then(() => {
            hash(password)
                .then((hash) => {
                    db.updateUsersPassword(email, hash)
                        .then(() => {
                            res.json({ success: true });
                        })
                        .catch((err) => {
                            console.error(
                                "something went wrong while updating users:",
                                err
                            );
                            res.json({ error: true });
                        });
                })
                .catch((err) => {
                    console.log("error in hashing pass", err);
                    res.json({ error: true });
                });
        })
        .catch((err) => {
            console.error("error in checking code", err);
            res.json({
                error: true,
            });
        });
});

module.exports = router;
