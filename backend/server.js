const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/", (req, res) => {
  res.send("🚀 Restaurant Backend Running Successfully");
});
