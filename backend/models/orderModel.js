const db = require("../config/db");

exports.placeOrder = (data, callback) => {
  db.query("INSERT INTO orders SET ?", data, callback);
};

exports.getOrdersByUser = (user_id, callback) => {
  db.query("SELECT * FROM orders WHERE user_id = ?", [user_id], callback);
};

exports.getAllOrders = (callback) => {
  db.query("SELECT * FROM orders", callback);
};
