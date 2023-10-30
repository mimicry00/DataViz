// https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=df9225978722845910f4cccc7eb0a84d&units=metric

let api = 'https://api.openweathermap.org/data/2.5/weather?q=';
// let city = 'Seoul';
let api_key = '&appid=df9225978722845910f4cccc7eb0a84d';
let units = '&units=metric';

let cities = ['Seoul', 'Moscow', 'Beijing', 'Cape Town', 'Cairo', 'London', 'New York'];

let cityweathers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);

  setInterval(loadData, 2000);
  // setTimeout(loadData, 2000);

}

function loadData() {
  cityweathers = [];
  for (let city of cities) {
    let url = api + city + api_key + units;
    loadJSON(url, gotData);
  }
}

function gotData(data) {
  // console.log(data);

  let weather = {
    city: data.name,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    windspeed: data.wind.speed,
    winddeg: data.wind.deg
  };

  cityweathers.push(new CityWeather(weather));

  // cityweathers[0].show();
}


function draw() {
  background(0);

  for (let cw of cityweathers) {
    cw.show();
  }

}

class CityWeather {
  constructor(weather) {
    this.weather = weather;

    for (let i = 0; i < cities.length; i++) {
      if (this.weather.city == cities[i]) {
        this.index = i;
      }
    }

    let interval = width / cities.length;
    this.x = this.index * interval + interval / 2;
    this.y = height / 2;
  }

  show() {
    let hue = map(this.weather.humidity, 40, 100, 190, 210);
    let d = map(this.weather.temperature, -10, 30, 0, 140);

    fill(hue, 100, 70);
    noStroke();
    ellipse(this.x, this.y, d);

    fill(255);
    textAlign(CENTER);
    text(this.weather.city, this.x, this.y - 90);

    push();
    translate(this.x, this.y);
    rotate(radians(this.weather.winddeg));
    stroke(255, 0.3);
    strokeWeight(this.weather.windspeed * 10);
    noFill();
    line(0, 0, this.weather.windspeed * 10, 0);
    pop();
  }
}
