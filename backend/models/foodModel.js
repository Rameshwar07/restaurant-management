const db = require("../config/db");

exports.addFood = (foodData, callback) => {
  const { name, price, category } = foodData;

  db.query(
    "INSERT INTO foods (name, price, category) VALUES (?, ?, ?)",
    [name, price, category],
    callback
  );
};

exports.getAllFoods = (callback) => {
  db.query("SELECT * FROM foods", callback);
};