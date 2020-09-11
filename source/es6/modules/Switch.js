class Switch {
  constructor() {
    this.isClosedByClickOnBody = false;
    this.bodyClickHandler = this.bodyClickHandler.bind(this);
  }

  init(params) {
    this.trigger = document.querySelector(params.triggerSelector);
    this.elementSelector = params.elementSelector;
    this.element = document.querySelector(params.elementSelector);
    this.classActive = params.classActive;
    this.manage();
  }

  showElement() {
    this.element.classList.add(this.classActive);

    if (this.isClosedByClickOnBody) {
      document.body.addEventListener("click", this.bodyClickHandler);
    }
  }

  closeElement() {
    this.element.classList.remove(this.classActive);

    if (this.isClosedByClickOnBody) {
      document.body.removeEventListener("click", this.bodyClickHandler);
    }
  }

  toggleElement() {
    if (!this.element.classList.contains(this.classActive)) {
      this.showElement();
    } else {
      this.closeElement();
    }
  }

  manage() {
    this.trigger.addEventListener("click", e => {
      if (e.target) {
        e.preventDefault();
      }
      this.toggleElement();
    });
  }

  bodyClickHandler(e) {
    if (e.target === this.trigger) {
      return;
    }
    if (!e.target.closest(this.elementSelector)) {
      this.closeElement();
    }
  }

  addClosedByClickOnBody() {
    this.isClosedByClickOnBody = true;
  }
}

export default Switch;
