import Slider from "./Slider";

function initSliders() {
  const sliders = document.querySelectorAll(".slider");

  for (let i = 0; i < sliders.length; i += 1) {
    const sliderEl = sliders[i];
    const slider = new Slider();
    slider.init(sliderEl);
    console.log(slider);
  }
}

export default initSliders;
