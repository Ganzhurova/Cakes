import throttle from "./throttle";

class Slider {
  init(element) {
    this.slider = element;
    this.wrapper = this.slider.querySelector(".slider__list");
    this.slides = this.slider.querySelectorAll(".slider__item");
    this.buttonPrev = this.slider.querySelector(".slider__button--prev");
    this.buttonNext = this.slider.querySelector(".slider__button--next");

    this.index = 0;
    this.total = this.slides.length;
    this.transform = 0;
    this.step = 100;
    this.visibleSlidesNumber = 1;

    this.indicatorsWrapper = this.slider.querySelector(".slider__indicators");
    this.numberIndicators = 5;

    this.setup();
    this.actions();
  }

  getSlidesAmount() {
    const slidesAmount = this.slider.querySelector(".slider__amount");

    if (!slidesAmount) {
      return;
    }

    this.slidesTotal = this.slider.querySelector(".slider__total");
    this.slideSerial = this.slider.querySelectorAll(".slider__serial");

    this.slidesTotal.textContent = this.total;

    // for (let i = 0; i < this.slidersTotal.length; i += 1) {
    //   this.slidersSerial[i].textContent = i + 1;
    // }
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
    this.getSlidesAmount();
    this.renderIndicators();
    this.showIndicators(this.index);
    this.setCurrentIndicator(this.index);
  }

  slideTo(pointer) {
    this.currentSlide = this.slides[pointer];
    this.wrapper.style.transform = `translateX(${this.transform}%)`;
  }

  navigate(direction) {
    if (direction === "next") {
      if (this.index === this.total - 1) {
        return;
      }
      this.index += 1;
      this.transform -= this.step;
    }

    if (direction === "prev") {
      if (this.index === 0) {
        return;
      }
      this.index -= 1;
      this.transform += this.step;
    }

    this.slideTo(this.index);
    this.showIndicators(this.index);
    this.setCurrentIndicator(this.index);
  }

  getVisibleSlidesNumber() {
    this.slideWidth = parseFloat(getComputedStyle(this.slides[0]).width);
    this.widthWrapper = parseFloat(getComputedStyle(this.wrapper).width);
    const slidesNumber = Math.floor(this.widthWrapper / this.slideWidth);
    this.visibleSlidesNumber = slidesNumber;
  }

  addMargins() {
    const marginsNumber = 2;
    const freeSpace =
      this.widthWrapper - this.slideWidth * this.visibleSlidesNumber;
    const freeSpacefForOne = freeSpace / this.visibleSlidesNumber;
    const marginWidth = freeSpacefForOne / marginsNumber;
    const marginStyle = `${marginWidth}px`;

    for (let i = 0; i < this.slides.length; i += 1) {
      const slide = this.slides[i];
      slide.style.marginLeft = marginStyle;
      slide.style.marginRight = marginStyle;
    }
  }

  actions() {
    window.addEventListener(
      "resize",
      throttle(() => {
        this.getVisibleSlidesNumber();
        this.addMargins();
      }, 1000)
    );

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
      this.navigate("next");
    });

    this.buttonPrev.addEventListener("click", e => {
      e.preventDefault();
      this.navigate("prev");
    });

    let startX = 0;
    this.slider.addEventListener("touchstart", e => {
      startX = e.changedTouches[0].clientX;
    });

    this.slider.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;
      const deltaX = startX - endX;
      if (deltaX > 50) {
        this.navigate("next");
      } else if (deltaX < -50) {
        this.navigate("prev");
      }
    });
  }
}

export default Slider;
