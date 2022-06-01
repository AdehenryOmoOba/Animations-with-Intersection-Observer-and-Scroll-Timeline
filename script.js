/////////////////Animation with Intersection Observer ////////////////////////////

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const h2 = $("#two h2");
const btnOne = $("#one button");
const PTexts = $$("#two p");
const h4 = $("#one h4");
// const imageThree = $("#three img");
const images = $$("main img");
let observList = Array.from(images);
observList = [...observList, h2];

const h1 = $("#one h1");
const h1String = h1.textContent;
const calculator = $("#two img");

window.addEventListener("load", () => {
  animateText();
  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("deem-img");

        if (entry.target.dataset.calculator) {
          entry.target.parentElement.classList.add("turn");
        }
        if (entry.target.dataset.h2) {
          PTexts.forEach((p) => p.classList.add("right-slide"));
          entry.target.classList.add("left-slide");
        }
      }
    });
  };

  const observer = new IntersectionObserver(callback, {});

  observList.forEach((image) => {
    observer.observe(image);
  });
});

////////////////////////////////
function animateText() {
  const h1Array = h1String.split("");
  const textLength = h1Array.length;
  h1.textContent = "";

  h1String.split("").map((item) => {
    if (item === " ") {
      h1.innerHTML += " ";
    } else {
      h1.innerHTML += `<span>${item}</span>`;
    }
  });

  let charCount = 0;
  let intervalID = setInterval(animator, 20);

  function animator() {
    const h1Spans = $$("#one h1 span");
    if (h1Spans[charCount]) h1Spans[charCount].classList.add("deem-text");
    charCount++;
    if (charCount === textLength) {
      clearInterval(intervalID);
      intervalID = null;
    }
  }
  h4.classList.add("h4-animate");
  btnOne.classList.add("btn-animate");
}

/////////////////Animation with Scroll Timeline ////////////////////////////
import "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js";
const scrollTracker = $(".scroll-tracker");
const STImages = $$("[data-scroll-timeline-image");

const scrollTrackerTimeline = new ScrollTimeline({
  scrollOffsets: [CSS.percent(0), CSS.percent(100)],
});
scrollTracker.animate(
  { transform: ["scaleX(0)", "scaleX(1)"] },
  { duration: 1, timeline: scrollTrackerTimeline }
);

STImages.forEach((image) => {
  const imageHeight = image.offsetHeight;
  const imageOffsetTop = image.offsetTop;
  console.log(imageHeight, imageOffsetTop);
  const STImagesTimeline = new ScrollTimeline({
    scrollOffsets: [
      CSS.px(imageOffsetTop + imageHeight - window.innerHeight - 300),
      CSS.px(imageOffsetTop - 400),
    ],
  });

  image.animate(
    {
      transform: [
        "perspective(30rem) rotateX(45deg)",
        "perspective(30rem) rotateX(0deg)",
      ],
      opacity: ["0.2", "1"],
    },
    { duration: 1, easing: "linear", timeline: STImagesTimeline }
  );
});
