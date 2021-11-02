"use strict";
const foodContainer = document.querySelector(".food-container");

const getPasta = async () => {
  try {
    const res = await fetch("pasta.json");
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const displayItem = (item) => {
  let result = "";
  item.map((pasta) => {
    result += ` <div class="food-container">
    <img src=${pasta.image} alt=${pasta.name}>
    <div>
      <span>$${pasta.price}</span>
      <button>주문하기</button>
    </div>
  </div>`;
  });
  foodContainer.innerHTML = result;
};
document.addEventListener("DOMContentLoaded", () => {
  getPasta().then((pasta) => displayItem(pasta));
});
