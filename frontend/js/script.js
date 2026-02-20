const API = "http://localhost:5000/api";

function checkLogin(requiredRole = null) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }

  if (requiredRole && user.role !== requiredRole) {
    alert("Access Denied!");
    window.location.href = "index.html";
  }
}


function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

/* REGISTER */
function register() {
  fetch(API + "/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value
    })
  }).then(res => res.json())
    .then(data => {
      alert(data.message);
      window.location.href = "login.html";
    });
}

/* LOGIN */
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {

      console.log("Login Response:", data); // VERY IMPORTANT

      // Case 1: If backend sends role directly
      if (data.role) {
        localStorage.setItem("user", JSON.stringify(data));

        if (data.role.toLowerCase() === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "index.html";
        }
      }

      // Case 2: If backend sends user object
      else if (data.user && data.user.role) {
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role.toLowerCase() === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "index.html";
        }
      }

      else {
        alert("Invalid Email or Password");
      }

    })
    .catch(err => {
      console.error(err);
      alert("Server Error");
    });
}

/*ADD FOOD*/
function addFood() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role.toLowerCase() !== "admin") {
    alert("Access Denied");
    return;
  }

  const name = document.getElementById("foodName").value;
  const price = document.getElementById("foodPrice").value;
  const category = document.getElementById("foodCategory").value;

  if (!name || !price || !category) {
    alert("Please fill all fields");
    return;
  }

  fetch("http://localhost:5000/api/foods/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, price, category })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("message").innerText = data.message;

      // Clear fields after adding
      document.getElementById("foodName").value = "";
      document.getElementById("foodPrice").value = "";
      document.getElementById("foodCategory").value = "";
    })
    .catch(err => {
      console.error(err);
      alert("Error adding food");
    });
}

/* DELETE USER */
function deleteUser(id) {
  fetch(API + "/users/delete/" + id, { method: "DELETE" })
    .then(res => res.json())
    .then(() => loadUsers());
}

/* CHANGE ROLE */

function changeRole(id, role) {
  fetch(API + "/users/role/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role })
  })
    .then(res => res.json())
    .then(() => loadUsers());
}

/* UPDATE ORDER STATUS */

function updateOrderStatus(id, status) {
  fetch(API + "/orders/status/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  })
    .then(res => res.json())
    .then(() => loadAdminOrders());
}


/* LOAD REVENUE CHART */

function loadRevenueChart(data) {

  const ctx = document.getElementById("revenueChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map(o => "Order " + o.id),
      datasets: [{
        label: "Revenue",
        data: data.map(o => o.total_amount)
      }]
    }
  });
}

/* SEARCH USERS */

function searchUsers() {
  let value = document.getElementById("searchUser").value.toLowerCase();
  let cards = document.querySelectorAll("#usersList .food-card");

  cards.forEach(card => {
    card.style.display =
      card.innerText.toLowerCase().includes(value)
        ? "block"
        : "none";
  });
}


/* LOAD FOODS */
function loadFoods() {
  fetch("http://localhost:5000/api/foods")
    .then(res => res.json())
    .then(data => {
      const foodsDiv = document.getElementById("foods");
      foodsDiv.innerHTML = "";

      data.forEach(food => {

        // 👇 Auto image from images folder
        const imageName = food.name.trim().toLowerCase();
        const imagePath = `frontend/images/${imageName}.jpg`;

        console.log(imagePath);
        foodsDiv.innerHTML += `
  <div class="food-card">
    <img src="${imagePath}" 
     onerror="this.src='frontend/images/default.jpg'"
     alt="${food.name}">
    <h3>${food.name}</h3>
    <p>₹${food.price}</p>
    <p>${food.category.toUpperCase()}</p>
    <button onclick="addToCart(${food.id}, '${food.name}', ${food.price})">
      Add to Cart
    </button>
  </div>
`;
      });
    })
    .catch(err => console.log(err));
}

/* ADD TO CART */
function addToCart(food_id) {
  const user = JSON.parse(localStorage.getItem("user"));
  fetch(API + "/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: user.id,
      food_id: food_id,
      quantity: 1
    })
  }).then(res => res.json())
    .then(data => alert(data.message));
}

/* LOAD CART */
function loadCart() {
  const user = JSON.parse(localStorage.getItem("user"));
  fetch(API + "/cart/" + user.id)
    .then(res => res.json())
    .then(data => {
      let html = "";
      let total = 0;
      data.forEach(item => {
        total += item.price * item.quantity;
        html += `
        <div class="food-card">
          <h3>${item.name}</h3>
          <p>₹${item.price} x ${item.quantity}</p>
        </div>
      `;
      });
      document.getElementById("cartItems").innerHTML = html;
      document.getElementById("totalAmount").innerText = "Total: ₹" + total;
    });
}

/* PLACE ORDER */
function placeOrder() {
  const user = JSON.parse(localStorage.getItem("user"));
  const total = document.getElementById("totalAmount").innerText.replace("Total: ₹", "");
  fetch(API + "/orders/place", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: user.id, total: total })
  }).then(res => res.json())
    .then(data => {
      alert(data.message);
      window.location.reload();
    });
}

/* LOAD ORDERS */
function loadOrders() {
  const user = JSON.parse(localStorage.getItem("user"));
  fetch(API + "/orders/user/" + user.id)
    .then(res => res.json())
    .then(data => {
      let html = "";
      data.forEach(order => {
        html += `
        <div class="food-card">
          <h3>Order #${order.id}</h3>
          <p>Total: ₹${order.total}</p>
          <p>Status: ${order.status}</p>
        </div>
      `;
      });
      document.getElementById("ordersList").innerHTML = html;
    });
}

/* ADMIN DASHBOARD */
function loadAdminOrders() {
  fetch(API + "/orders")
    .then(res => res.json())
    .then(data => {
      let html = "";
      data.forEach(order => {
        html += `
        <div class="food-card">
          <p>User ID: ${order.user_id}</p>
          <p>Total: ₹${order.total}</p>
          <p>Status: ${order.status}</p>
        </div>
      `;
      });
      document.getElementById("adminOrders").innerHTML = html;
    });
}
function loadUsers() {
  fetch(API + "/users/all")
    .then(res => res.json())
    .then(data => {
      let html = "";
      data.forEach(user => {
        html += `
        <div class="food-card">
          <h3>${user.name}</h3>
          <p>Email: ${user.email}</p>
          <p>Role: ${user.role}</p>
        </div>
      `;
      });
      document.getElementById("usersList").innerHTML = html;
    });
}
function loadDashboardStats() {

  fetch(API + "/users/all")
    .then(res => res.json())
    .then(data => {
      document.getElementById("totalUsers").innerText = data.length;
    });

  fetch(API + "/orders/all")
    .then(res => res.json())
    .then(data => {
      document.getElementById("totalOrders").innerText = data.length;

      let revenue = 0;
      data.forEach(order => {
        revenue += Number(order.total);
      });

      document.getElementById("totalRevenue").innerText = "₹" + revenue;
    });
}
