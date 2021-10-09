class Pasta {
  async getPasta() {
    try {
      let result = await fetch("pasta.json");
      let data = await result.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const pasta = new Pasta();
  pasta.getPasta();
});
