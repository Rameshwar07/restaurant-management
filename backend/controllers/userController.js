const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const db = require("../config/db");

/* REGISTER */
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    name,
    email,
    password: hashedPassword,
    role: "user"
  };

  userModel.createUser(userData, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User Registered Successfully" });
  });
};

/* LOGIN */
exports.login = (req, res) => {
  const { email, password } = req.body;

  userModel.getUserByEmail(email, async (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  });
};

/* GET ALL USERS */
exports.getAllUsers = (req, res) => {
  db.query("SELECT id, name, email, role FROM users", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/* DELETE USER */
exports.deleteUser = (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User Deleted" });
  });
};

/* CHANGE ROLE */
exports.changeRole = (req, res) => {
  db.query(
    "UPDATE users SET role = ? WHERE id = ?",
    [req.body.role, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Role Updated" });
    }
  );
};
