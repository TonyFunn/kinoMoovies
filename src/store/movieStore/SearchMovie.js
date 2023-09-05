import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useMovieStore } from './storeMovie';
const url = "https://kinopoiskapiunofficial.tech/api/v2.2/films"

export const useMovieSearch = defineStore('_moviesearch', () => {
  const state = reactive({
    movies: [],
    loader: false
  })
  const getMovies = async (search) => {
    state.loader = true
    const result = await fetch(`${url}?keyword=${search}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': 'b5b4a886-9a07-4581-9533-2944412ab7dd',
          'Content-Type': 'application/json',
        }
      }
    ).then(res => res.json()).catch(err => console.log(err))

    state.movies = result.items
    state.loader = false
  }
  const addFavoriteMovie = (object) => {
    const movieStore = useMovieStore()
    movieStore.state.movies.push({...object, isWatched: false})
    alert('Movie added')
  }

  return {
    state,
    getMovies,
    addFavoriteMovie
  }
})
