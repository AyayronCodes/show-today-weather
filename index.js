import Data from "./Data.js";
import * as view from "./view.js";

async function start() {
  // create Weather obj and get input value
  const cityInput = view.getInput();
  const data = new Data(cityInput);
  // clear search bar
  view.clearSearch();
  try {
    // get WOE (Where On Earth) id
    await data.saveWoe();
    // get weather with the retrived WOE id
    await data.saveWeather();
    // get appropriate weather img
    await data.saveImgLink();
    // display the info's on result div
    await view.displayImg(data.link);
    view.displayPar(data.weather);
    view.showResult();
  } catch {
    // catch error
    alert(
      "hmm, either...\n1) you entered your city incorrectly, or\n2) we don't have access to your city's weather yet\nPlease try searching again."
    );
  }
}

window.addEventListener("DOMContentLoaded", view.showMain);
document.getElementById("submit-btn").addEventListener("click", start);
