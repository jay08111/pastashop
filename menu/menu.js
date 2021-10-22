const imageContainer = document.querySelector(".img-container");

class Pasta {
  async getPasta() {
    try {
      let result = await fetch("../pasta.json");
      let data = await result.json();
      let items = data.items;
      console.log(items);
      return items;
    } catch (error) {
      console.log(error);
    }
  }
  displayImage(item) {
    let result = "";
    item.map((pasta) => {
      result += `<div class="img-box grid">
      <img src=${pasta.image} alt=${pasta.name} class="menu-image" />
      <h4>${pasta.price}$</h4>
      <button>장바구니에 추가</button>
      </div>`;
    });
    imageContainer.innerHTML = result;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const pasta = new Pasta();
  pasta.getPasta().then((item) => {
    pasta.displayImage(item);
  });
});
