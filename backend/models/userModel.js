const db = require("../config/db");

exports.createUser = (data, callback) => {
  db.query("INSERT INTO users SET ?", data, callback);
};

exports.getUserByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};

exports.loginUser = (email, password, callback) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  
  db.query(sql, [email, password], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};
