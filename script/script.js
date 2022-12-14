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

  const orders = JSON.parse(localStorage.getItem("freeOrders")) || [];

  const toStorage = () => {
    localStorage.setItem("freeOrders", JSON.stringify(orders));
  };

  const calcDeadline = (deadline) => {
    const currentDate = Date.now();
    const deadlineDate = Date.parse(deadline);
    const days = Math.floor((deadlineDate - currentDate) / 1000 / 3600 / 24);
    console.log(days);
    console.log((deadlineDate - currentDate) / 1000 / 3600 / 24);

    if ((deadlineDate - currentDate) / 1000 / 3600 < 24) {
      const hours = Math.abs(
        Math.floor((deadlineDate - currentDate) / 1000 / 3600)
      );
      return hours + " " + getNoun(hours, ["часов", "час", "часа"]);
    }

    return days + " " + getNoun(days, ["дней", "день", "дня"]);
  };

  const getNoun = (number, arr) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return arr[0];
    }
    n %= 10;
    if (n === 1) {
      return arr[1];
    }
    if (n >= 2 && n <= 4) {
      return arr[2];
    }
    return arr[0];
  };

  const renderOrders = () => {
    ordersTable.textContent = "";
    orders.forEach((order, i) => {
      ordersTable.innerHTML += `
      <tr class="order ${
        order.active ? "taken" : ""
      }" data-number-order = "${i}">
        <td>${i + 1}</td>
        <td>${order.title}</td>
        <td class="${order.currency}"></td>
        <td>${calcDeadline(order.deadline)}</td>
      </tr>`;
    });
  };

  const handlerModal = (event) => {
    const target = event.target;
    const modal = target.closest(".order-modal");
    const order = orders[modal.id];

    const baseAction = () => {
      modal.style.display = "none";
      toStorage();
      renderOrders();
    };

    if (target.closest(".close") || target === modal) {
      modal.style.display = "none";
    }

    if (target.classList.contains("get-order")) {
      order.active = true;
      baseAction();
    }

    if (target.id === "capitulation") {
      order.active = false;
      baseAction();
    }

    if (target.id === "ready") {
      orders.splice(orders.indexOf(order), 1);
      baseAction();
    }
  };

  const openModal = (numberOrder) => {
    const order = orders[numberOrder];

    const {
      title,
      firstName,
      email,
      phone,
      description,
      amount,
      currency,
      deadline,
      active = false,
    } = order;

    const modal = active ? modalOrderActive : modalOrder;

    const firstNameBlock = modal.querySelector(".firstName"),
      titleBlock = modal.querySelector(".modal-title"),
      emailBlock = modal.querySelector(".email"),
      descriptionBlock = modal.querySelector(".description"),
      deadlineBlock = modal.querySelector(".deadline"),
      currencyBlock = modal.querySelector(".currency_img"),
      countBlock = modal.querySelector(".count"),
      phoneBlock = modal.querySelector(".phone");

    modal.id = numberOrder;
    titleBlock.textContent = title;
    firstNameBlock.textContent = firstName;
    emailBlock.textContent = email;
    emailBlock.href = "mailto:" + email;
    descriptionBlock.textContent = description;
    deadlineBlock.textContent = calcDeadline(deadline);
    currencyBlock.classList = "currency_img";
    currencyBlock.classList.add(currency);
    countBlock.textContent = amount;
    phoneBlock ? (phoneBlock.href = "tel:" + phone) : "";

    modal.style.display = "flex";

    modal.addEventListener("click", handlerModal);
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
    const toDay = new Date().toISOString().substring(0, 10);
    document.getElementById("deadline").min = toDay;
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
    toStorage();
  });
});
