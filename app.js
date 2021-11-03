"use strict";
const foodContainer = document.querySelector(".food-container");

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
      <div class="food-description">
        <span>$${pasta.price}</span>
        <span>${pasta.name}</span>
      </div>
    </div>`;
  });
  foodContainer.innerHTML = result;
};
document.addEventListener("DOMContentLoaded", () => {
  getPasta().then((pasta) => displayItem(pasta));
});
