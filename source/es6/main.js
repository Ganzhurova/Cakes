import polyfills from "./modules/polyfills";
import navMenu from "./modules/navMenu";
import initSlider from "./modules/initSlider";

window.addEventListener("DOMContentLoaded", () => {
  polyfills();
  navMenu();
  initSlider();
});
