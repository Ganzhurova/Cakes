import polyfills from "./modules/polyfills";
import navMenu from "./modules/navMenu";

window.addEventListener("DOMContentLoaded", () => {
  polyfills();
  navMenu();
});
