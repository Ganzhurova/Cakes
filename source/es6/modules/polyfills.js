const polyfills = () => {
  (function matches() {
    // проверяем поддержку
    if (!Element.prototype.matches) {
      // определяем свойство
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
  })();

  (function addClosest() {
    // проверяем поддержку
    if (!Element.prototype.closest) {
      // реализуем
      Element.prototype.closest = function closest(css) {
        let node = this;
        while (node) {
          if (node.matches(css)) return node;
          node = node.parentElement;
        }
        return null;
      };
    }
  })();
};

export default polyfills;
