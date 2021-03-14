var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:rens:recollection@localhost:5432/recollection"
);

module.exports.addUser = (first, last, email, pass) => {
    const q = `INSERT INTO users (first,last, email, pass)
    VALUES ($1,$2,$3,$4)
    RETURNING id`;
    const param = [first, last, email, pass];
    return db.query(q, param);
};

module.exports.getHash = (email) => {
    const q = `SELECT * FROM users WHERE email = ($1)`;
    const param = [email];
    return db.query(q, param);
};

module.exports.addSecretCode = (email, secretCode) => {
    const q = `INSERT INTO reset_codes (email, code) 
    VALUES ($1,$2)
    RETURNING id`;
    const params = [email, secretCode];
    return db.query(q, params);
};

module.exports.checkCode = (email, code) => {
    const q = `SELECT * FROM reset_codes 
    WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' 
    AND email = ($1) 
    AND code = ($2)`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.updateUsersPassword = (email, hashedPassword) => {
    const q = `UPDATE users SET pass = ($1) WHERE email = ($2)`;
    const params = [hashedPassword, email];
    return db.query(q, params);
};

module.exports.getLoggedInUser = (id) => {
    const q = `SELECT first,last,email,bio,url FROM users WHERE id = ($1)`;
    const params = [id];
    return db.query(q, params);
};

module.exports.uploadUrl = (id, url) => {
    const q = `UPDATE users SET url = ($1) WHERE id = ($2)`;
    const params = [url, id];
    return db.query(q, params);
};

module.exports.updateBio = (id, bio) => {
    const q = `UPDATE users SET bio = ($1) WHERE id = ($2)`;
    const params = [bio, id];
    return db.query(q, params);
};

module.exports.getInfoOfOtherUser = (id) => {
    const q = `SELECT first,last,bio,url FROM users WHERE id=($1)`;
    const params = [id];
    return db.query(q, params);
};
