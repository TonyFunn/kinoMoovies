import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'

export const useMovieStore = defineStore('_moviestore', () => {
  const state = reactive({
    value: 1,
    movies: [
      {
        kinopoiskId: 1,
        nameRu: "Spider-Man",
        genres: [],
        overview:
          "After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man.",
        posterUrlPreview: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg",
        year: "2002-05-01",
        isWatched: true
      },
      {
        kinopoiskId: 2,
        nameRu: "The Batman",
        genres: [],
        overview:
          "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
        posterUrlPreview: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
        year: "2022-03-01",
        isWatched: false
      }
    ],
    tab: null
  })

  const moviesInLocalStorage = localStorage.getItem('_movies')
  if (moviesInLocalStorage) {
    state.movies = JSON.parse(moviesInLocalStorage)
  }

  //getters
  const watchedMovies = computed(() => {
    return state.movies.filter(movie => movie.isWatched === true)
  })

  // Actions
  const movieDelete = (movieId) => {
    state.movies = state.movies.filter((movie) => movie.kinopoiskId != movieId)
  }

  watch(() => state.movies, (movies) => {
    localStorage.setItem('_movies', JSON.stringify(movies))
  }, {deep: true})

  return {
    state,
    watchedMovies,
    movieDelete
  }
})
