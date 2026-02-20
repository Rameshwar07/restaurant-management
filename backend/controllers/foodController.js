const foodModel = require("../models/foodModel");
const db = require("../config/db");
/* ADD FOOD */
exports.addFood = (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    "INSERT INTO foods (name, price, category) VALUES (?, ?, ?)",
    [name, price, category],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error adding food" });
      }

      res.json({ message: "Food Added Successfully!" });
    }
  );
};

/* GET ALL FOODS */
exports.getFoods = (req, res) => {
  foodModel.getAllFoods((err, result) => {
    if (err)
      { 
      return res.status(500).json(err);
    }
    res.json(result);
  });
};
