"use strict";
const menu = document.querySelector(".input--menu");
const address = document.querySelector(".input--address");
document.querySelector(".submit").addEventListener("click", () => {
  if (!menu.value) {
    window.alert("메뉴를 입력하세요!");
  } else if (!address.value) {
    window.alert("주소를 입력하세요!");
  } else {
    window.alert("주문완료되었습니다!");
  }
});
