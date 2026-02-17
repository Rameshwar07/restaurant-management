restaurant-management/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   ├── foodModel.js
│   │   ├── cartModel.js
│   │   └── orderModel.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── foodRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── foodController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   │
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── css/
    │   └── style.css
    │
    ├── js/
    │   └── script.js
    │
    ├── index.html
    ├── login.html
    ├── register.html
    ├── menu.html
    ├── cart.html
    ├── orders.html
    └── admin.html

🗄 STEP 1: DATABASE SETUP Run on workbench

CREATE DATABASE restaurant_db;
USE restaurant_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(20) DEFAULT 'user'
);

CREATE TABLE foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    image VARCHAR(255)
);

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    food_id INT,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (food_id) REFERENCES foods(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


⚙ STEP 2: BACKEND SETUP (Install Required Packages) Go inside backend folder:

npm init -y
npm install express mysql2 cors body-parser bcrypt jsonwebtoken
npm install nodemon --save-dev

✅ Step 3: Run Server Again
Now run:
npm run dev

🔥 If Still Not Working

Run this instead:

npx nodemon server.js