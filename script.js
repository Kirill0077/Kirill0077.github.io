const circle = document.querySelector(".progress-ring__circle");
const valueInput = document.getElementById("progress-value__input");
const animateCheckbox = document.getElementById("animate-checkbox");
const hideCheckbox = document.getElementById("hide-checkbox");
const progressBlock = document.querySelector(".progress-block__ring");
const interval = 100;
const stepProcess = 1;
const radius = circle.r.baseVal.value;
const lenghtCircle = 2 * Math.PI * radius;
let animationInterval;

circle.style.strokeDasharray = `${lenghtCircle} ${lenghtCircle}`;
circle.style.strokedashoffset = `${lenghtCircle}`;

function setProgress(percent) {
  const offset = lenghtCircle - (percent / 100) * lenghtCircle;
  circle.style.strokeDashoffset = offset;
}

valueInput.addEventListener("input", function () {
  const value = parseInt(this.value, 10);
  if (value < 0) {
    this.value = 0;
  } else if (value > 100) {
    this.value = 100;
  }
  setProgress(this.value);
});

animateCheckbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    animationInterval = setInterval(() => {
      let currentValue = parseInt(valueInput.value, 10);
      currentValue = currentValue + stepProcess;
      if (currentValue > 100) {
        valueInput.value = 100;
        setProgress(100);
        return;
      } else {
        valueInput.value = currentValue;
        setProgress(currentValue);
      }
    }, interval);
  } else {
    clearInterval(animationInterval);
  }
});

hideCheckbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    progressBlock.style.display = "none";
  } else {
    progressBlock.style.display = "flex";
  }
});
