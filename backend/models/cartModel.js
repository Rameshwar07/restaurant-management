const db = require("../config/db");

exports.addToCart = (data, callback) => {
  db.query("INSERT INTO cart SET ?", data, callback);
};

exports.getCartByUser = (user_id, callback) => {
  db.query(
    `SELECT cart.*, foods.name, foods.price
     FROM cart
     JOIN foods ON cart.food_id = foods.id
     WHERE cart.user_id = ?`,
    [user_id],
    callback
  );
};

exports.clearCart = (user_id, callback) => {
  db.query("DELETE FROM cart WHERE user_id = ?", [user_id], callback);
};
