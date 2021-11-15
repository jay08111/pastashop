"use strict";
//variables
const foodContainer = document.querySelector(".food-container");
const cartIcon = document.querySelector(".cart-icon");
const overLay = document.querySelector(".overlay");
const closeCart = document.querySelector(".close-cart");
const cart = document.querySelector(".cart");
const cartContent = document.querySelector(".cart-content");
const reviewIcon = document.querySelector(".review-icon");
const reviewCart = document.querySelector(".review-cart");
const reviewOverLay = document.querySelector(".review");
const closeCartReview = document.querySelector(".close-cart-review");
const reviewContent = document.querySelector(".review-content");
const cartTotal = document.querySelector(".cart-total");
const cartOrder = document.querySelector(".cart-order");
const clearCart = document.querySelector(".clear-cart");

let buttonArr = [];
let cartArr = [];
//async fetch function
const getPasta = async () => {
  try {
    const res = await fetch("pasta.json");
    const data = await res.json();
    return { data: data.items, review: data.reviews };
  } catch (error) {
    console.log(error);
  }
};
//display functions
const displayItem = (item) => {
  let result = "";
  item.data.map((pasta) => {
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
const addCartItem = (item) => {
  const div = document.createElement("div");
  div.classList.add("cart-item");
  div.innerHTML = `<img src=${item.image} alt=${item.name}>
                        <div class='cart-main'>
                          <h4>${item.name}</h4>
                          <h5>$<span></span>${item.price}</h5>
                          <span class='remove-item' data-id=${item.id}><i class="fas fa-trash"></i><span></span>remove</span>
                        </div>
                        <div class='cart-secondary'>
                          <i class="fas fa-chevron-up" data-id=${item.id}></i>
                          <p class="item-amount">${item.amount}</p>
                          <i class="fas fa-chevron-down" data-id=${item.id}></i>
                        </div>`;
  cartContent.appendChild(div);
};
const displayReviews = (item) => {
  let result = "";
  item.review.map((item) => {
    result += `<img src=${item.image} alt=${item.name} class='review-img'>
  <div class='review-main'>
    <h4 class='review-name'>${item.name}</h4>
    <p class='review-description'>${item.review}</p>
  </div>`;
  });
  reviewContent.innerHTML = result;
};
//set and get localstorage
const setPastaData = (pasta) => {
  localStorage.setItem("pasta", JSON.stringify(pasta.data));
};
const getPastaData = (id) => {
  const getPasta = JSON.parse(localStorage.getItem("pasta"));
  return getPasta.find((items) => items.id === id);
};
// get all of buttons and set buttons to buttonArr array
const getBagBtns = () => {
  const buttons = [...document.querySelectorAll(".food-bagBtn")];
  buttonArr = buttons;
  buttons.map((btn) => {
    let id = btn.dataset.id;
    btn.addEventListener("click", (e) => {
      e.target.innerText = "장바구니에 담김!";
      e.target.disabled = true;
      let cartItem = { ...getPastaData(id), amount: 1 };
      cartArr = [...cartArr, cartItem];
      addCartItem(cartItem);
      setCartValue(cartArr);
      showCart();
    });
  });
};
// remove individual cart item
const removeItem = (id) => {
  cartArr = cartArr.filter((item) => item.id !== id);
  setCartValue(cartArr);
  let button = getSingleButton(id);
  button.disabled = false;
  button.innerHTML = `<i class="fas fa-shopping-cart"></i> 장바구니에 담기`;
};
// get single buttons
const getSingleButton = (id) => {
  return buttonArr.find((btns) => btns.dataset.id === id);
};
// clear all of items from cart
const clearCartItems = () => {
  clearCart.addEventListener("click", () => {
    let cartItems = cartArr.map((item) => item.id);
    cartItems.map((id) => removeItem(id));
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
  });
  cartContent.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const removeItemTarget = e.target;
      const id = removeItemTarget.dataset.id;
      cartContent.removeChild(removeItemTarget.parentElement.parentElement);
      removeItem(id);
    } else if (e.target.classList.contains("fa-chevron-up")) {
      const addAmount = e.target;
      const id = addAmount.dataset.id;
      let tempItem = cartArr.find((item) => item.id === id);
      tempItem.amount = tempItem.amount + 1;
      setCartValue(cartArr);
      addAmount.nextElementSibling.innerText = tempItem.amount;
    } else if (e.target.classList.contains("fa-chevron-down")) {
      const lowerAmount = e.target;
      const id = lowerAmount.dataset.id;
      let tempItem = cartArr.find((item) => item.id === id);
      tempItem.amount = tempItem.amount - 1;
      if (tempItem.amount > 0) {
        setCartValue(cartArr);
        lowerAmount.previousElementSibling.innerText = tempItem.amount;
      } else {
        cartContent.removeChild(lowerAmount.parentElement.parentElement);
        removeItem(id);
      }
    }
  });
};
// set cart total price
const setCartValue = (cart) => {
  let tempTotal = 0;
  cart.map((item) => {
    tempTotal += item.price * item.amount;
  });
  cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
};
//review cart , pasta cart open and close
const showCart = () => {
  overLay.classList.add("visible");
  cart.classList.add("showCart");
};
const closingCart = () => {
  overLay.classList.remove("visible");
  cart.classList.remove("showCart");
};
const showReviewCart = () => {
  reviewOverLay.classList.add("visible");
  reviewCart.classList.add("showCart");
};
const closeReviewCart = () => {
  reviewOverLay.classList.remove("visible");
  reviewCart.classList.remove("showCart");
};

//Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  getPasta()
    .then((pasta) => {
      displayItem(pasta);
      setPastaData(pasta);
      displayReviews(pasta);
    })
    .then(() => {
      getBagBtns();
      clearCartItems();
    });
});
cartIcon.addEventListener("click", showCart);
closeCart.addEventListener("click", closingCart);
reviewIcon.addEventListener("click", showReviewCart);
closeCartReview.addEventListener("click", closeReviewCart);
cartOrder.addEventListener("click", () => {
  if (cartArr.length === 0) {
    window.alert("목록이 없습니다.");
  } else {
    window.alert("주문완료!");
    location.reload();
  }
});
