const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const multer = require("multer");
const cryptoRandomString = require("crypto-random-string");
const uidSafe = require("uid-safe");

const db = require("./db");
const s3 = require("./s3");
const { s3Url } = require("./config");
const { hash, compare } = require("./bc");
const { sendEmail } = require("./ses");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + "/uploads");
    },
    filename: (req, file, callback) => {
        uidSafe(24)
            .then((uid) => {
                callback(null, `${uid}${path.extname(file.originalname)}`);
            })
            .catch((err) => callback(err));
    },
});

const uploader = multer({
    storage,
    limits: {
        // Set a file size limit to prevent users from uploading huge files and to protect against DOS attacks
        fileSize: 2097152,
    },
});

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
                    res.json({ error: true });
                });
        })
        .catch((err) => {
            console.error("error in hashing password", err);
            res.json({ error: true });
        });
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
                    res.json({ error: true });
                }
            });
        })
        .catch((err) => {
            console.error("login get hash failed", err);
            res.json({ error: true });
        });
});

app.post("/password/reset/start", (req, res) => {
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

app.post("/password/reset/verify", (req, res) => {
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

app.get("/recentUsers", (req, res) => {
    db.getRecentUsers()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/searchUsers", (req, res) => {
    console.log(req.body.val);
    db.searchForUsers(req.body.val)
        .then(({ rows }) => res.json(rows))
        .catch((err) => console.log(err));
});

app.post("/upload", uploader.single("image"), s3.upload, (req, res) => {
    if (req.file) {
        const image = `${s3Url}${req.file.filename}`;
        db.uploadUrl(req.session.userId, image)
            .then(() => {
                res.json({ url: image });
            })
            .catch((err) => {
                console.error(
                    "🚀 ~ file: server.js ~ line 221 ~ app.post ~ err",
                    err
                );
            });
    } else {
        res.json({ error: true });
    }
});

app.post("/updateBio", (req, res) => {
    const { bio } = req.body;
    console.log(req);
    db.updateBio(req.session.userId, bio)
        .then(() => {
            res.json({ success: true, bio: bio });
        })
        .catch((err) => {
            console.error("error in update bio route", err);
            res.json({ error: true });
        });
});

app.get("/user", (req, res) => {
    db.getLoggedInUser(req.session.userId)
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch((err) => {
            console.error("error in user get", err);
            res.json({
                error: true,
            });
        });
});

app.post("/getOtherProfileInfo", (req, res) => {
    if (req.body.id == req.session.userId) {
        res.json({ error: true });
    } else {
        db.getInfoOfOtherUser(req.body.id)
            .then(({ rows }) => {
                if (rows[0]) {
                    res.json(rows[0]);
                } else {
                    res.json({ error: true });
                }
            })
            .catch((err) => {
                console.error(
                    "something went wrong in db query get other profile",
                    err
                );
                res.json({ error: true });
            });
    }
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
