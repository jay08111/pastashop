"use strict";
const foodContainer = document.querySelector(".food-container");
const cartIcon = document.querySelector(".cart-icon");
const cartOverLay = document.querySelector(".cart-overlay");
const closeCart = document.querySelector(".close-cart");
const cart = document.querySelector(".cart");

let buttonDOM = [];
let cartDOM = [];
//functions
const getPasta = async () => {
  try {
    const res = await fetch("pasta.json");
    const data = await res.json();
    return data.items;
  } catch (error) {
    console.log(error);
  }
};
const displayItem = (item) => {
  let result = "";
  item.map((pasta) => {
    result += `<div class="food-order">
      <img src=${pasta.image} alt=${pasta.name} class="food-img">
      <button class="food-bagBtn" data-id=${pasta.id}>
      <i class="fas fa-shopping-cart"></i>
      장바구니에 담기
    </button>
      <div class="food-description">
        <span>$${pasta.price}</span>
        <span class="food-name">${pasta.name}</span>
      </div>
    </div>`;
  });
  foodContainer.innerHTML = result;
};
const getBagBtns = () => {
  const buttons = [...document.querySelectorAll(".food-bagBtn")];
  buttonDOM = buttons;
  buttons.map((btn) => {
    let id = btn.dataset.id;
    // let inCart = cart.find((item) => item.id === id);
    btn.addEventListener("click", () => {
      cartOverLay.classList.add("visible");
      cart.classList.add("showCart");
    });
  });
};
//Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  getPasta()
    .then((pasta) => displayItem(pasta))
    .then(() => {
      getBagBtns();
    });
});
cartIcon.addEventListener("click", () => {
  cartOverLay.classList.add("visible");
  cart.classList.add("showCart");
});
closeCart.addEventListener("click", () => {
  cartOverLay.classList.remove("visible");
  cart.classList.remove("showCart");
});
