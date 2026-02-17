const orderModel = require("../models/orderModel");
const cartModel = require("../models/cartModel");
const db = require("../config/db");

/* PLACE ORDER */
exports.placeOrder = (req, res) => {
  const orderData = {
    user_id: req.body.user_id,
    total: req.body.total,
    status: "Pending"
  };

  orderModel.placeOrder(orderData, (err) => {
    if (err) return res.status(500).json(err);

    cartModel.clearCart(req.body.user_id, () => {});
    res.json({ message: "Order Placed Successfully" });
  });
};

/* USER ORDERS */
exports.getUserOrders = (req, res) => {
  orderModel.getOrdersByUser(req.params.user_id, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

/* ALL ORDERS */
exports.getAllOrders = (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/* UPDATE STATUS */
exports.updateStatus = (req, res) => {
  db.query(
    "UPDATE orders SET status=? WHERE id=?",
    [req.body.status, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Order Updated" });
    }
  );
};
