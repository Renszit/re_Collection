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

module.exports.getRecentUsers = () => {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 3`);
};

module.exports.searchForUsers = (val) => {
    const q = `SELECT first,last,id,url FROM users WHERE first ILIKE ($1) LIMIT 3`;
    const param = [val + "%"];
    return db.query(q, param);
};

//FRIENDSHIPS - export to other file later.

module.exports.checkForFriendships = (otherUserId, userId) => {
    const q = `SELECT * FROM friendships
  WHERE (recipient_id = $1 AND sender_id = $2)
  OR (recipient_id = $2 AND sender_id = $1);`;
    const params = [otherUserId, userId];
    return db.query(q, params);
};

module.exports.makeRequest = (userId, otherUserId) => {
    const q = `INSERT INTO friendships (sender_id, recipient_id) VALUES ($1, $2) RETURNING *`;
    const param = [userId, otherUserId];
    return db.query(q, param);
};

module.exports.unfriend = (userId, otherUserId) => {
    const q = `DELETE FROM friendships 
    WHERE (sender_id = $1 AND recipient_id = $2) 
    OR (recipient_id = $1 AND sender_id = $2) `;
    const param = [userId, otherUserId];
    return db.query(q, param);
};

module.exports.friendAccept = (userId, otherUserId) => {
    const q = `UPDATE friendships SET accepted = TRUE 
    WHERE (sender_id = $1 AND recipient_id = $2) 
    OR (recipient_id = $1 AND sender_id = $2) `;
    const param = [userId, otherUserId];
    return db.query(q, param);
};

module.exports.getWannabes = (id) => {
    const q = `SELECT users.id, first, last, url, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)`;
    const param = [id];
    return db.query(q, param);
};

//messaging

module.exports.recentMessages = () => {
    const q = `(SELECT chatters.sender_id, chatters.message, chatters.created_at, users.url, users.first, users.last 
    FROM chatters
    JOIN users 
    ON chatters.sender_id = users.id
    LIMIT 10) 
    ORDER BY chatters.created_at DESC
    `;
    return db.query(q);
};

module.exports.newMessage = (sender_id, message) => {
    const q = `INSERT INTO chatters (sender_id, message) 
    VALUES($1,$2) RETURNING id`;
    const params = [sender_id, message];
    return db.query(q, params);
};

module.exports.getUserInfo = (id) => {
    const q = `SELECT id,first,last,url
    FROM users WHERE id = ($1)`;
    const params = [id];
    return db.query(q, params);
};

module.exports.getUsersByIds = (arrayOfIds) => {
    const query = `SELECT id, first, last, url FROM users WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds]);
};

// private messaging

module.exports.newPrivateMessage = (sender_id, recipient_id, message) => {
    const q = `INSERT INTO userchat (sender_id, recipient_id, message) VALUES ($1,$2,$3) returning id, created_at`;
    const params = [sender_id, recipient_id, message];
    return db.query(q, params);
};

// module.exports.getPrivateMessages = (sender_id, recipient_id) => {
//     const q = `(SELECT userchat.sender_id, userchat.message, userchat.created_at, users.url, users.first, users.last 
//     FROM chatters WHERE (userchat.sender_id = $1 AND userchat.recipient_id = $2) OR (userchat.recipient_id = $1 AND userchat.sender_id = $2)
//     JOIN users 
//     ON userchat.sender_id = users.id
//     LIMIT 10) 
//     ORDER BY chatters.created_at DESC
//     `;
//     const params = [sender_id, recipient_id];
//     return db.query(q, params);
// };
