class Slider {
  init(selector) {
    this.slider = document.querySelector(selector);
    this.wrapper = this.slider.querySelector(".slider__list");
    this.slides = this.slider.querySelectorAll(".slider__item");
    this.buttonPrev = this.slider.querySelector(".slider__button--prev");
    this.buttonNext = this.slider.querySelector(".slider__button--next");

    this.index = 0;
    this.total = this.slides.length;
    this.transform = 0;
    this.step = 100;

    this.indicatorsWrapper = this.slider.querySelector(".slider__indicators");
    this.numberIndicators = 5;

    this.setup();
    this.actions();
  }

  makeIndicator(index) {
    this.indicatorEl = document.createElement("a");
    this.indicatorEl.classList.add("slider__indicator");
    this.indicatorEl.setAttribute("href", "#");
    this.indicatorEl.dataset.index = index;
    this.indicatorEl.hidden = true;
    return this.indicatorEl;
  }

  renderIndicators() {
    for (let i = 0; i < this.total; i += 1) {
      this.indicatorsWrapper.appendChild(this.makeIndicator(i));
    }
    this.indicators = this.slider.querySelectorAll(".slider__indicator");
  }

  showIndicators(pointer) {
    const iteration = Math.ceil(this.total / this.numberIndicators);

    for (let n = 0; n < iteration; n += 1) {
      const indexStart = this.numberIndicators * n;
      let indexEnd = indexStart + this.numberIndicators;
      if (indexEnd > this.total) {
        indexEnd = this.total;
      }

      if (pointer === indexStart || pointer === indexEnd - 1) {
        if (this.indicators[pointer].hidden === false) {
          return;
        }

        for (let i = 0; i < this.total; i += 1) {
          const indicator = this.indicators[i];
          if (i < indexStart || i >= indexEnd) {
            indicator.hidden = true;
          } else {
            indicator.hidden = false;
          }
        }
      }
    }
  }

  setCurrentIndicator(pointer) {
    const number = pointer;

    this.currentIndicator = this.indicators[number];
    this.currentIndicator.classList.add("slider__indicator--current");

    for (let i = 0; i < this.indicators.length; i += 1) {
      this.indicator = this.indicators[i];

      if (i !== number) {
        this.indicator.classList.remove("slider__indicator--current");
      }
    }
  }

  setup() {
    this.renderIndicators();
    this.showIndicators(this.index);
    this.setCurrentIndicator(this.index);
  }

  slideTo(pointer) {
    this.currentSlide = this.slides[pointer];
    this.wrapper.style.transform = `translateX(${this.transform}%)`;
  }

  actions() {
    this.indicatorsWrapper.addEventListener("click", e => {
      if (e.target.className === "slider__indicator") {
        e.preventDefault();

        const indicator = e.target;
        this.index = Number(indicator.getAttribute("data-index"));
        this.transform = this.step * this.index * -1;
        this.slideTo(this.index);
        this.setCurrentIndicator(this.index);
      }
    });

    this.buttonNext.addEventListener("click", e => {
      e.preventDefault();

      if (this.index === this.total - 1) {
        return;
      }

      this.index += 1;
      this.transform -= this.step;

      this.slideTo(this.index);
      this.showIndicators(this.index);
      this.setCurrentIndicator(this.index);
    });

    this.buttonPrev.addEventListener("click", e => {
      e.preventDefault();

      if (this.index === 0) {
        return;
      }

      this.index -= 1;
      this.transform += this.step;

      this.slideTo(this.index);
      this.showIndicators(this.index);
      this.setCurrentIndicator(this.index);
    });
  }
}

export default Slider;
