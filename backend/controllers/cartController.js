const cartModel = require("../models/cartModel");

exports.addCart = (req, res) => {
  cartModel.addToCart(req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Added to Cart" });
  });
};

exports.getCart = (req, res) => {
  cartModel.getCartByUser(req.params.user_id, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};
