//https://api.themoviedb.org/3/discover/movie?api_key=6e3867d96f91f22961174af3e912b0a6&language=en-US&year=2022&region=KR

let genreIDs = {
  28: 'action',
  12: 'adventure',
  10749: 'romance',
  10402: 'music',
  35: 'comedy',
  16: 'animated',
  18: 'drama',
  10751: 'family',
  99: 'documentary',
  36: 'history',
  10770: 'TV movie',
  14: 'fantasy',
  878: 'scifi',
  9648: 'mystery',
  53: 'thriller',
  27: 'horror',
  80: 'crime',
  37: 'western',
  10752: 'war'
};


let url = 'https://api.themoviedb.org/3/discover/movie?api_key=6e3867d96f91f22961174af3e912b0a6&language=en-US&year=2022&region=KR&page=';
let page = 1;

let data, movieArr;
let movies = [];


function preload() {
  data = loadJSON('movies.json');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(0, 10, 10);


  let genreids = Object.keys(genreIDs);
  let genrecols = [];
  for (let i = 0; i < genreids.length; i++) {
    let hue = map(i, 0, genreids.length, 0, 360);
    genrecols.push(color(hue, 60, 90));
  }

  // console.log(genreids);



  /*********** Movie Lines **************/
  movieArr = Object.values(data);

  movieArr.forEach((obj) => {
    if (obj.genre_ids[0] != undefined) {
      movies.push({
        popularity: obj.popularity,
        release_date: obj.release_date,
        genre_id: obj.genre_ids[0],
        vote_average: obj.vote_average
      });
    }
  });

  // console.log(movies);

  movies.sort((x, y) => {
    if (x.release_date < y.release_date) {
      return -1;
    }
    if (x.release_date > y.release_date) {
      return 1;
    }
    return 0;
  });

  let num = movies.length;
  let interval = (height * 0.95) / num;

  for (let mv of movies) {
    let index = movies.indexOf(mv);
    let x = width * 0.15;
    let y = index * interval + (height * 0.05) / 2;
    // let w = -mv.vote_average * 12;
    // let w = -mv.popularity * 0.2;
    let w = map(mv.popularity, 0, 2000, 0, -width*0.15);
    let h = interval;

    mv.dateX = x;
    mv.dateY = y;

    let id = mv.genre_id.toString();
    let i = genreids.indexOf(id);
    let c = genrecols[i];

    mv.col = c;

    fill(c);
    noStroke();
    rect(x, y, w, h * 0.6);
  }

  // movies.forEach((elem, index) => {
  //   if (elem.genre_ids[0] === undefined) {
  //     movies.splice(index, 1);
  //     movies.splice(0, 0, elem);
  //   }
  // });

  // movies.sort((x, y) => {
  //   if (x.genre_ids[0] < y.genre_ids[0]) {
  //     return -1;
  //   }
  //   if (x.genre_ids[0] > y.genre_ids[0]) {
  //     return 1;
  //   }
  //   return 0;
  // });

  movies.sort((a, b) => {
    return a.genre_id - b.genre_id;
  });

  let intv = (height * 0.5) / num;
  let jump = 0;

  for (let mv of movies) {
    let index = movies.indexOf(mv);

    if(index > 0) {
      if (mv.genre_id != movies[index - 1].genre_id) {
        jump += 10;
      }
    }
    let x = width - width * 0.15;
    let y = intv * index + (height * 0.5 - (genreids.length-1)*10) / 2 + jump;


    mv.genreX = x;
    mv.genreY = y;

    noFill();
    stroke(mv.col);
    line(x, y, x - 20, y);

    fill(0, 0, 50);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    if (index === 0) {
      let k = mv.genre_id;
      text(genreIDs[k], x + 10, y+6);
    } else {
      if (mv.genre_id != movies[index - 1].genre_id) {
        let k = mv.genre_id;
        text(genreIDs[k], x + 10, y+6);
      }
    }
  }


  for (let mv of movies) {
    mv.col.setAlpha(0.5);
    noFill();
    stroke(mv.col);
    beginShape();
    vertex(mv.dateX, mv.dateY);
    bezierVertex(width / 2, mv.dateY, width / 2, mv.genreY, mv.genreX, mv.genreY);
    endShape();
  }






  /********* movie dots **********/
  // let num = floor(sqrt(movies.length));
  // let w = (width*0.8)/num;

  // for(let i=0; i<movies.length; i++) {
  //   let col = i%num;
  //   let row = floor(i/num);
  //   let x = col*w + (width*0.2)/2;
  //   let y = row*w + (width*0.2)/2;

  //   let id = movies[i].genre_ids[0];
  //   let c;
  //   if(id === undefined) {
  //     c = color(0, 0, 80);
  //   } else {
  //     id = id.toString();
  //     let index = genreids.indexOf(id);
  //     c = genrecols[index];
  //   }
  //   // console.log(c);

  //   fill(c);
  //   noStroke();
  //   ellipse(x, y, w*0.9);
  // }

  /******* sort and list ********/
  // movies.sort((a, b) => {
  //   return a.genre_ids[0] - b.genre_ids[0];
  // });
  // console.log(movies[0]);

  // for (let i = 0; i < movies.length; i++) {
  //   let title = movies[i].title;
  //   let score = movies[i].vote_average;
  //   let genre = movies[i].genre_ids[0];
  //   let div = createDiv(i + '. ' + title + ' : ' + score + ' : ' + genre);
  //   div.style('font-size', '6px');
  // }

  /******* to make a json file ********/
  // loadJSON(url+page, gotLoaded);
}

function sortString(objArr) {
  objArr.sort((x, y) => {
    if (x.name < y.name) {
      return -1;
    }
    if (x.name > y.name) {
      return 1;
    }
    return 0;
  });
}


// function gotLoaded(data) {
//   movies.push(...data.results);
//   // console.log(movies);

//   if(page<63) {
//     page++;
//     loadJSON(url+page, gotLoaded);
//   } else {
//     saveJSON(movies, 'movies.json');
//   }
// }

function draw() {
  // background(220);
}
