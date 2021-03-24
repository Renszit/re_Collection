const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const multer = require("multer");
const cryptoRandomString = require("crypto-random-string");
const uidSafe = require("uid-safe");

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

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

io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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
            console.log("error in recent users", err);
        });
});

app.get("/searchUsers/:val", (req, res) => {
    db.searchForUsers(req.params.val)
        .then(({ rows }) => res.json(rows))
        .catch((err) => console.log("error in searching users", err));
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

app.get("/getwannabes", (req, res) => {
    console.log("works");
    db.getWannabes(req.session.userId)
        .then(({ rows }) => {
            console.log(rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("error in getting wannabes", err);
        });
});

app.post("/acceptfriend", (req, res) => {
    const { otherId } = req.body;
    db.friendAccept(req.session.userId, otherId).then(() => {
        res.json({
            rows: {
                accepted: true,
            },
            userId: req.session.userId,
        });
    });
});

app.post("/unfriend", (req, res) => {
    const { otherId } = req.body;
    db.unfriend(req.session.userId, otherId)
        .then(() => {
            res.json({
                rows: null,
                userId: req.session.userId,
            });
        })
        .catch((err) => console.log("error unfriend", err));
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

app.get("/friendships/:id", (req, res) => {
    db.checkForFriendships(req.params.id, req.session.userId)
        .then(({ rows }) => {
            res.json({
                rows: rows[0],
                userId: req.session.userId,
            });
        })
        .catch((err) => {
            console.error("something wrong in getting friendship status", err);
        });
});

app.post("/addfriend", (req, res) => {
    const BUTTON_TEXT = {
        ACCEPT: "accept request",
        REQUEST: "request friendship",
        CANCEL: "cancel request",
        UNFRIEND: "unfriend",
    };
    const { action, otherId } = req.body;

    if (action == BUTTON_TEXT.REQUEST) {
        db.makeRequest(req.session.userId, otherId)
            .then(({ rows }) => {
                res.json({
                    rows: rows[0],
                    userId: req.session.userId,
                });
            })
            .catch((err) => console.log("error makerequest", err));
    } else if (action == BUTTON_TEXT.CANCEL || BUTTON_TEXT.UNFRIEND) {
        db.unfriend(req.session.userId, otherId)
            .then(() => {
                res.json({
                    rows: null,
                    userId: req.session.userId,
                });
            })
            .catch((err) => console.log("error unfriend", err));
    } else if (action == BUTTON_TEXT.ACCEPT) {
        db.friendAccept(req.session.userId, otherId)
            .then(() => {
                res.json({
                    rows: {
                        accepted: true,
                    },
                    userId: req.session.userId,
                });
            })
            .catch((err) => console.log("error in accepting friend", err));
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.sendStatus(200);
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

let onlineUsers = {};

io.on("connection", (socket) => {
    console.log(`socket with id ${socket.id} just connected!`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;

    onlineUsers[socket.id] = userId;
    
    const onlineUserIds = Object.values(onlineUsers);

    db.getUsersByIds(onlineUserIds)
        .then(({ rows }) => {
            // console.log("online users:", rows);
            socket.emit("online users", rows);
        })
        .catch((err) => console.log("error in getting users by id's", err));

    if (onlineUserIds.filter((id) => id == userId).length == 1) {
        db.getUserInfo(userId)
            .then(({ rows }) => {
                // console.log("new user online!", rows);
                socket.broadcast.emit("new user just joined", rows);
            })
            .catch((err) => console.log("error in emitting to users", err));
    }

    db.recentMessages()
        .then(({ rows }) => {
            socket.emit("newMessages", rows.reverse());
        })
        .catch((err) => console.error(err));

    socket.on("my amazing chat message", (message) => {
        db.newMessage(userId, message)
            .then(() => {
                db.getUserInfo(userId)
                    .then(({ rows }) => {
                        io.sockets.emit("new message incoming", {
                            userId: userId,
                            message: message,
                            first: rows[0].first,
                            last: rows[0].last,
                            url: rows[0].url,
                        });
                    })
                    .catch((err) =>
                        console.log("error in posting to socket", err)
                    );
            })
            .catch((err) => console.log("error in posting new image", err));
    });

    socket.on("disconnect", function () {
        delete onlineUsers[socket.id];
        if (Object.values(onlineUsers).indexOf(userId) < 1) {
            socket.broadcast.emit("user left", { user: userId });
        }
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });
});
