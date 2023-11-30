import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'

export const useMovieStore = defineStore('_moviestore', () => {
  const state = reactive({
    value: 1,
    movies: [],
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
