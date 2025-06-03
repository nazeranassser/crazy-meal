"use strict";

function Order(mealName, mealPrice, mealImage) {
  this.mealName = mealName;
  this.mealPrice = mealPrice;
  this.mealImage = mealImage;
}

let orders = JSON.parse(localStorage.getItem("orders")) || [];

const orderForm = document.getElementById("orderForm");
const ordersTable = document.querySelector("#ordersTable tbody");
const clearBtn = document.getElementById("clearOrders");

function displayOrders() {
  ordersTable.innerHTML = "";
  orders.forEach((order) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${order.mealName}</td>
      <td>${order.mealPrice} JD</td>
      <td><img src="${order.mealImage}" alt="${order.mealName}" width="100"></td>
    `;

    ordersTable.appendChild(row);
  });
}

if (orderForm) {
  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("mealName").value;
    const price = document.getElementById("mealPrice").value;
    const image = document.getElementById("mealImage").value;

    const newOrder = new Order(name, price, image);
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    displayOrders();

    orderForm.reset();
  });
}

if (clearBtn) {
  clearBtn.addEventListener("click", function () {
    orders = [];
    localStorage.removeItem("orders");
    displayOrders();
  });
}

displayOrders();
