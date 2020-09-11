import Switch from "./Switch";

const navMenu = () => {
  function initNav() {
    const params = {
      triggerSelector: ".nav__button",
      elementSelector: ".nav",
      classActive: "nav--active"
    };

    if (!document.querySelector(params.triggerSelector)) {
      return;
    }

    const navInteractive = new Switch();
    navInteractive.init(params);
    navInteractive.addClosedByClickOnBody();
  }

  initNav();
};

export default navMenu;
