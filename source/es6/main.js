import polyfills from "./modules/polyfills";
import navMenu from "./modules/navMenu";
import initSliders from "./modules/initSlider";

window.addEventListener("DOMContentLoaded", () => {
  polyfills();
  navMenu();
  initSliders();
});
