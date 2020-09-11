class Switch {
  init(params) {
    this.trigger = document.querySelector(params.triggerSelector);
    this.element = document.querySelector(params.elementSelector);
    this.classActive = params.classActive;
    this.manage();
  }

  showElement() {
    this.element.classList.add(this.classActive);
  }

  closeElement() {
    this.element.classList.remove(this.classActive);
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
}

export default Switch;
