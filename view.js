const elements = {
  body: document.querySelector("body"),
  input: document.getElementById("city-input"),
  submitBtn: document.getElementById("submit-btn"),
  paragraph: document.getElementById("weather-par"),
  resultDiv: document.querySelector(".result"),
  whiteBg: document.querySelector(".white-bg"),
  weathers: document.querySelector(".weathers"),
  loader: document.querySelector(".loader"),
};

export function getInput() {
  return elements.input.value;
}

export function displayImg(id, url) {
  const image = document.getElementById(`img-${id}`);
  image.src = url;
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
  elements.weathers.innerHTML = "";
  elements.paragraph.innerText = "";
  elements.input.focus();
}

export function showMain() {
  gsap.fromTo(
    elements.whiteBg,
    { opacity: 0 },
    { opacity: 0.9, delay: 0.6, duration: 1.2 }
  );
}

export function createWeatherBox(id, date, weather) {
  let html = `<div class="weather-box" id ="weather-%id%">
            <span id="date-%id%">%date%</span>
            <span id="weather-%id%">%weather%</span>
            <img id="img-%id%" src="" alt="weather image %id%">
          </div>`;

  html = html.replace(/%id%/g, id);
  html = html.replace("%date%", date);
  html = html.replace("%weather%", weather);

  elements.weathers.insertAdjacentHTML("beforeend", html);
}

export function changeBgImage(city) {
  // elements.body.style.backgroundImage = `url("https://source.unsplash.com/1920x1080/?${city}")`;
  gsap.to("body", {
    backgroundImage: `url("https://source.unsplash.com/1920x1080/?${city}")`,
    duration: 0.6,
  });
}

export function showResult() {
  elements.resultDiv.classList.remove("hidden");
  const tl = gsap.timeline();
  tl.fromTo(
    ".weather-box",
    {
      opacity: 0,
      y: -50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "bounce.out",
      stagger: 0.4,
    }
  ).fromTo(
    "#weather-par",
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

// add a loading wheel
export function toggleLoader() {
  elements.submitBtn.classList.toggle("hidden");
  elements.loader.classList.toggle("hidden");
  elements.input.value = elements.loader.classList.contains("hidden")
    ? ""
    : "Getting results...";
}
