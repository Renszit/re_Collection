const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");

const db = require("./db");
const { hash, compare } = require("./bc");

app.use(compression());

app.use(
    express.json({
        extended: false,
    })
);

const cookieSessionMiddleware = cookieSession({
    secret: `Kill them with kindness`,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
});

app.use(cookieSessionMiddleware);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/register", (req, res) => {
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
                    res.json({ success: false });
                });
        })
        .catch((err) => console.log("error in hashing password", err));
});

app.post("/login", (req, res) => {
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
                    res.json({ success: false });
                }
            });
        })
        .catch((err) => {
            console.log("login get hash failed", err),
            res.json({ error: true });
        });
});

app.post("/password/reset/start", (req, res) => {
    const { email } = req.body;
    const secretCode = cryptoRandomString({
        length: 6,
    });
    
});

app.post("/password/reset/verify", (req, res) => {
    const { userId, code, password } = req.body;
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
