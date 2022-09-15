document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const customer = document.getElementById("customer");
  const freelancer = document.getElementById("freelancer");
  const blockCustomer = document.getElementById("block-customer");
  const blockFreelance = document.getElementById("block-freelancer");
  const blockChoice = document.getElementById("block-choice");
  const btnExit = document.getElementById("btn-exit");
  const formCustomer = document.getElementById("form-customer");
  const ordersTable = document.getElementById("orders");

  const orders = [];

  const renderOrders = () => {
    ordersTable.textContent = "";
    orders.forEach((order, i) => {
      ordersTable.innerHTML += `
      <tr class="order" data-number-order>
        <td>${i + 1}</td>
        <td>${order.title}</td>
        <td class="${order.currency}"></td>
        <td>${order.deadline}</td>
      </tr>`;
    });
  };

  ordersTable.addEventListener("click", (event) => {
    const target = event.target;
    console.log(target);

    const targetOrder = target.closest(".order");
  });

  customer.addEventListener("click", () => {
    blockChoice.style.display = "none";
    blockCustomer.style.display = "block";
    btnExit.style.display = "block";
  });

  freelancer.addEventListener("click", () => {
    blockChoice.style.display = "none";
    renderOrders();
    blockFreelance.style.display = "block";
    btnExit.style.display = "block";
  });

  btnExit.addEventListener("click", () => {
    blockChoice.style.display = "block";
    btnExit.style.display = "none";
    blockFreelance.style.display = "none";
    blockCustomer.style.display = "none";
  });

  formCustomer.addEventListener("submit", (event) => {
    event.preventDefault();

    const obj = {};
    for (const elem of formCustomer.elements) {
      if (
        (elem.tagName === "INPUT" && elem.type !== "radio") ||
        (elem.type === "radio" && elem.checked) ||
        elem.tagName === "TEXTAREA"
      ) {
        obj[elem.name] = elem.value;
      }
    }

    formCustomer.reset();
    orders.push(obj);
    console.log(orders);
  });
});
