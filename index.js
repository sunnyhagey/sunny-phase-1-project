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
    moviesData.forEach(movies => showMovieName(movies))
    movieDetails(moviesData[0])
}
//Movie Picture Display. DIV ID = "movie-display"
function showMovieName(movies) {
    const movieDisplay = document.getElementById("movie-display")
    
    const img = document.createElement("img")
    img.setAttribute('id', 'display-img')
    movieDisplay.appendChild(img)
    img.src = movies.image
    img.addEventListener("click", () => movieDetails(movies))
}

// Details section. DIV ID = "movie-details"

function movieDetails(movies) {
    const details = document.getElementById("movie-details")
    
    const h2 = document.getElementById("movie")
    h2.textContent = movies.movie

    const img = document.getElementById("movie-image")
    img.src = movies.image

    const movieDescription = document.getElementById("movie-description")
    movieDescription.textContent = movies.description 

    const rottenTomatoes = document.getElementById("rotten-tomatoes")
    rottenTomatoes.textContent = `Rotten Tomatoes: ${movies["rottentomato"]}%`
    
    const agree = document.getElementById("agree")
    agree.textContent = `🍿${movies.agreed} in Agreement⭐️`

    //Button
    const button = document.getElementById("button")
    button.onclick = function(){
        movies.agreed += 1

        if (movies.id === 2){
            alert("Oh, hi Mark!")
        }

        movieDetails(movies)
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
          description: movieForm.description.value,
          rottentomato: movieForm.rottentomato.value,
          agreed: 0
      })
      }
    
      fetch(moviesUrl, postRequest)
      .then(resp => resp.json())
      .then(data => showMovieName(data))
    
      movieForm.reset();  // Reset all form data
      return false; // Prevent page refresh
    }


