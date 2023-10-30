let api = 'http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=';
let api_key = 'egSe1qoKCL3YndgBzI98hBtaJPrfpiNVup9QkLc7kNZPr%2BVnFrpXCDBUd6wpHTATsgNzqXS6lBDRrSW56PzXHA%3D%3D';
let page = '&numOfRows=360&pageNo=1';
let dataType = '&dataType=JSON';
let date = '&dataCd=ASOS&dateCd=DAY&startDt=20220401&endDt=20230331';
let loc = '&stnIds=108'; //서울

let data;
// let weather = [];
let tm = [];
let temps = [];
let humidities = [];

let start = 0;
let range = 120;

function preload() {
  let url = api + api_key + page + dataType + date + loc;
  data = loadJSON(url);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  let weather = data.response.body.items.item;
  for(let i=0; i<weather.length; i++) {
    tm.push(weather[i].tm);
    temps.push(weather[i].avgTa);
    humidities.push(weather[i].avgRhm);
  }
  // console.log(temps);
}

function drawWeather(dt, col, scale) {
  let interval = width/dt.length;

  fill(col);
  noStroke();

  beginShape();
  curveVertex(0, height/2);
  curveVertex(0, height/2);
  for(let i=0; i<dt.length; i++) {
    let x = interval*i;
    let y = height/2-dt[i]*scale;
    curveVertex(x, y);
  }
  curveVertex(width, height/2);
  curveVertex(width, height/2);
  endShape();
}

function draw() {
  background(255);

  drawWeather(humidities, color(105, 109, 125, 120), 5);
  drawWeather(temps, color(232, 72, 85, 200), 10);

}