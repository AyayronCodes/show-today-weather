import Data from "./Data.js";
import * as view from "./view.js";

let runStatus = false;

async function start() {
  // change to true when search starts
  runStatus = true;
  // create Weather obj and get input value
  const cityInput = view.getInput();
  const data = new Data(cityInput);
  // clear search bar
  view.clearSearch();
  // bring in loader
  view.toggleLoader();
  try {
    // get WOE (Where On Earth) id
    await data.saveWoe();
    // get weather with the retrived WOE id
    await data.saveWeather();
    // get appropriate weather img
    await data.saveImgLink();
    // save dates
    await data.saveDates();
    // set bg to img of the city
    view.changeBgImage(data.city);
    // add weather boxes
    for (let i = 0; i < data.dates.length; i++) {
      view.createWeatherBox(i, data.dates[i], data.weathers[i]);
      // display the info's on result div
      view.displayImg(i, data.links[i]);
    }
    view.displayPar(data.weathers[0]);
    // remove loader
    view.toggleLoader();
    // show result section
    view.showResult();
    // keep track that section has ended
    runStatus = false;
  } catch (error) {
    // catch error
    alert(
      "hmm, either...\n1) you entered your city incorrectly, or\n2) we don't have access to your city's weather yet\nPlease try searching again."
    );
    console.log(error);
    // remove loader
    view.toggleLoader();
    // keep track that section has ended
    runStatus = false;
  }
}

window.addEventListener("DOMContentLoaded", view.showMain);
document.getElementById("submit-btn").addEventListener("click", start);
window.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && runStatus === false) start();
});
//
