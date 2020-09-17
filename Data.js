export default class Data {
  constructor(city) {
    this.city = city.toLowerCase();
  }

  async saveWoe() {
    const jsonFile = await fetch(
      `https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/search/?query=${this.city}`
    );
    const result = await jsonFile.json();
    const woeid = result[0].woeid;
    this.woeid = woeid;
  }

  async saveWeather() {
    const jsonFile = await fetch(
      `https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/${this.woeid}/`
    );
    const result = await jsonFile.json();
    // // save today's weather prop.
    // console.log(result);
    // const weather = result.consolidated_weather[0].weather_state_name;
    // this.weather = weather.toLowerCase();
    this.weathers = result.consolidated_weather.map((el) =>
      el.weather_state_name.toLowerCase()
    );
  }

  async saveImgLink() {
    const jsonFile = await fetch("weatherLinks.json");
    const linksObj = await jsonFile.json();
    // const imgLink = linksObj[this.weather];
    // this.link = imgLink;
    this.links = [];
    for (let i = 0; i < this.weathers.length; i++) {
      this.links.push(linksObj[this.weathers[i]]);
    }
  }

  async saveDates() {
    const jsonFile = await fetch(
      `https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/${this.woeid}/`
    );
    const result = await jsonFile.json();
    this.dates = result.consolidated_weather.map((el) => el.applicable_date);
  }
}
