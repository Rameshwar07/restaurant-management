const db = require("../config/db");

exports.addFood = (foodData, callback) => {
  const { name, price, image } = foodData;

  db.query(
    "INSERT INTO foods (name, price, image) VALUES (?, ?, ?)",
    [name, price, image],
    callback
  );
};

exports.getAllFoods = (callback) => {
  db.query("SELECT * FROM foods ORDER BY created_at DESC", callback);
};
