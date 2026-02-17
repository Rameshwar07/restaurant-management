const foodModel = require("../models/foodModel");

/* ADD FOOD */
exports.addFood = (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and Price required" });
  }

  const foodData = { name, price, image };

  foodModel.addFood(foodData, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Food Added Successfully" });
  });
};

/* GET ALL FOODS */
exports.getFoods = (req, res) => {
  foodModel.getAllFoods((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
