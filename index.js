const baseUrl = "http://localhost:3000/"
const moviesUrl = baseUrl + "movies/"

// This was me testing if my js file was sourced in the html correctly
// const test = document.getElementById("test")
// test.addEventListener("mouseover", (event) => thisIsATest(event))

// function thisIsATest(event) {
//     console.log("Hello, world!")
// }

//fetch data

// window.addEventListener("load", function () {
//     alert("Oh, hi Mark!");
//   })


function fecthMovies () {
    fetch(moviesUrl)
    .then(resp => resp.json())
    .then((moviesData) => renderMovieData(moviesData))
}

fecthMovies();


function renderMovieData(moviesData) {
    moviesData.forEach(movie => showMovieName(movie))
    movieDetails(moviesData[0])
}
//Movie Picture Display. DIV ID = "movie-display"
function showMovieName(movie) {
    const movieDisplay = document.getElementById("movie-display")
    
    const img = document.createElement("img")
    img.setAttribute('id', 'display-img')
    movieDisplay.appendChild(img)
    img.src = movie.image
    img.addEventListener("click", () => movieDetails(movie))
}

// Details section. DIV ID = "movie-details"

function movieDetails(movie) {
    const details = document.getElementById("movie-details")
    
    const h2 = document.getElementById("movie")
    h2.textContent = movie.movie

    const img = document.getElementById("movie-image")
    img.src = movie.image

    const movieDescription = document.getElementById("movie-description")
    movieDescription.textContent = movie.description 

    const rottenTomatoes = document.getElementById("rotten-tomatoes")
    rottenTomatoes.textContent = `Rotten Tomatoes: ${movie["rottentomato"]}%`
    
    //Button
    const button = document.getElementById("button")
    button.onclick = function(){
        const agree = document.getElementById("agree")
        const result = parseInt(++movie.agreed)

        agree.textContent = `${result} in Agreement`
        
    }
}

//Submission Form

const movieForm = document.getElementById("movie-form")
movieForm.addEventListener("submit", (e) => submitYourMovie(e))

function submitYourMovie(e) {
    e.preventDefault();
    
    let postRequest = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify({
          movie: movieForm.movie.value,
          image: movieForm.image.value,
          description: movieForm.decription.value,
          rottentomato: movieForm.rottentomato.value,
          agreed: 0
      })
      }
    
      fetch(moviesUrl, postRequest)
      .then(resp => resp.json())
      .then(data => showMovieName(data))
    }

//second fetch (fetching the room specifically) + alert when button is clicked

// const hiMarkUrl = "http://localhost:3000/movies/2"

// function fetchForTheButtonMark() {
//     fetch(hiMarkUrl)
//     .then(resp => resp.json())
//     .then(eventData => getThatDataForMark(eventData))
// }

// fetchForTheButtonMark();

// function getThatDataForMark(eventData) {
    
// }

