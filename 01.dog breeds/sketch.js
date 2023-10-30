let table;
let dogs = [];
let panelWidth, panelHeight;
let numCols = 6, numRows = 5;

let currentD = 0;
let start = 0, end = 29;

// function preload() {
//   table = loadTable('fci-breeds.csv', 'csv', 'header');
// }

function setup() {
  createCanvas(windowWidth, windowHeight);

  panelWidth = width / numCols;
  panelHeight = height / numRows;

  table = loadTable('fci-breeds.csv', 'csv', 'header', gotLoaded);
}

function gotLoaded() {
  let names = table.getColumn('name');
  let groups = table.getColumn('group');
  let countries = table.getColumn('country');
  let imgURLs = table.getColumn('image');

  for (let i = 0; i < table.getRowCount(); i++) {
    let dog = {};
    dog.name = names[i];
    dog.group = groups[i];
    dog.country = countries[i];
    dog.imgUrl = imgURLs[i];

    let col = i % numCols;
    let row = floor(i / numCols);
    let x = col * panelWidth;
    let y = row * panelHeight;

    dogs.push(new DogPanel(dog, x, y));
  }
  // console.log(dogs);
}

function mouseWheel(event) {
  let maxD = 125 * (floor(dogs.length / numCols) - 4);

  currentD += event.delta;
  if (currentD < 0) currentD = 0;
  if (currentD > maxD) currentD = maxD;
  let currentP = floor(currentD / 125);

  start = currentP * numCols;
  end = start + numCols * numRows - 1;
  if (end > dogs.length) end = dogs.length - 1;

  console.log(dogs.length + ',' + start + ',' + end);
}

function draw() {
  background(255);

  // if(dogs[0].imgOK)  dogs[0].show();

  for (let i = start; i <= end; i++) {
    dogs[i].x = (i - start) % numCols * panelWidth;
    dogs[i].y = floor((i - start) / numCols) * panelHeight;
    dogs[i].showBlank();
    if (dogs[i].imgOK) dogs[i].showImg();
    dogs[i].show();
  }
}

class DogPanel {
  constructor(dog, x, y) {
    this.dog = dog;
    this.x = x;
    this.y = y;
    this.imgOK = false;
    this.img = createImg(this.dog.imgUrl, () => {
      this.img.hide();
      this.imgOK = true;
      this.imgW = panelWidth;
      this.imgH = (this.img.height * panelWidth) / this.img.width;
    });

  }

  showBlank() {
    push();
    translate(this.x, this.y);

    fill(255);
    noStroke();
    rect(0, 0, panelWidth, panelHeight);

    pop();

  }

  showImg() {
    push();
    translate(this.x, this.y);

    fill(255);
    noStroke();
    rect(0, 0, panelWidth, panelHeight);

    image(this.img, 0, 0, this.imgW, this.imgH);
    pop();
  }

  show() {
    push();
    translate(this.x, this.y);

    // fill(255);
    // noStroke();
    // rect(0, 0, panelWidth, panelHeight);

    // image(this.img, 0, 0, this.imgW, this.imgH);

    fill(126, 80);
    noStroke();
    rect(0, panelHeight * 0.7, panelWidth, panelHeight * 0.3)

    fill(0);
    noStroke();
    textAlign(CENTER);
    text(this.dog.name, panelWidth / 2, panelHeight * 0.8);
    text(this.dog.group, panelWidth / 2, panelHeight * 0.87);
    text(this.dog.country, panelWidth / 2, panelHeight * 0.94);

    noFill();
    stroke(200);
    rect(0, 0, panelWidth, panelHeight);

    pop();
  }
}