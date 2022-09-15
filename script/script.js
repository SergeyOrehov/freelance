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

  const modalOrder = document.getElementById("order_read"),
    modalOrderActive = document.getElementById("order_active");

  const orders = [];

  const renderOrders = () => {
    ordersTable.textContent = "";
    orders.forEach((order, i) => {
      ordersTable.innerHTML += `
      <tr class="order" data-number-order = "${i}">
        <td>${i + 1}</td>
        <td>${order.title}</td>
        <td class="${order.currency}"></td>
        <td>${order.deadline}</td>
      </tr>`;
    });
  };

  const openModal = (numberOrder) => {
    const order = orders[numberOrder];
    const modal = order.active ? modalOrderActive : modalOrder;

    const firstNameBlock = document.querySelector(".firstName"),
      titleBlock = document.querySelector(".modal-title"),
      emailBlock = document.querySelector(".email"),
      descriptionBlock = document.querySelector(".description"),
      deadlineBlock = document.querySelector(".deadline"),
      currencyBlock = document.querySelector(".currency_img"),
      countBlock = document.querySelector(".count"),
      phoneBlock = document.querySelector(".phone");

    titleBlock.textContent = order.title;

    modal.style.display = "block";
  };

  ordersTable.addEventListener("click", (event) => {
    const target = event.target;

    const targetOrder = target.closest(".order");
    if (targetOrder) {
      openModal(targetOrder.dataset.numberOrder);
    }
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
