const elements = {
  input: document.getElementById("city-input"),
  image: document.getElementById("weather-img"),
  paragraph: document.getElementById("weather-par"),
  resultDiv: document.querySelector(".result"),
  whiteBg: document.querySelector(".white-bg"),
};

export function getInput() {
  return elements.input.value;
}

export function displayImg(link) {
  elements.image.src = link;
}

export function displayPar(weather) {
  let sentence = "Our weather forecast shows signs of ";
  if (weather === "showers") {
    sentence += "rain showers";
  } else if (weather === "clear") {
    sentence = "clear sky the whole day";
  } else {
    sentence += weather;
  }
  sentence += " today.";
  elements.paragraph.innerText = sentence;
}
export function clearSearch() {
  elements.input.value = "";
  elements.input.focus();
}

export function showMain() {
  gsap.fromTo(
    elements.whiteBg,
    { opacity: 0 },
    { opacity: 0.9, delay: 1, duration: 1.2 }
  );
}

export function showResult() {
  elements.resultDiv.classList.remove("hidden");
  const tl = gsap.timeline();
  tl.fromTo(
    elements.image,
    {
      opacity: 0,
      y: 80,
      duration: 1.5,
    },
    {
      opacity: 1,
      y: 0,
    }
  ).fromTo(
    elements.paragraph,
    {
      opacity: 0,
      duration: 1.5,
    },
    {
      opacity: 1,
    }
  );
}

export function hideResult() {
  elements.resultDiv.classList.add("hidden");
}

function toggleLoader() {}
