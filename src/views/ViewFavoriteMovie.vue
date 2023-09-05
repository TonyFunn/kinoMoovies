<template>
  <v-container>
    <v-row>
      <h1 class="main-title ma-3">My favorite movies</h1>
    </v-row>
    <v-card>
      <v-tabs
        v-model="movieStore.state.tab"
        bg-color="blue"
      >
        <v-tab value="one">Watched Movies</v-tab>
        <v-tab value="two">Movies</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="movieStore.state.tab">
          <v-window-item value="one">
            <v-row>
              <h3 class="ma-3">Count: {{ movieStore.watchedMovies.length }}</h3>
            </v-row>
            <v-row
              v-for="movie of movieStore.watchedMovies"
              :key="movie.kinopoiskId"
            >
              <v-col>
                <movie
                  v-if="movie.isWatched"
                  :movie="movie"
                />
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="two">
            <v-row
              v-for="movie of movieStore.state.movies"
              :key="movie.kinopoiskId"
            >
              <v-col>
                <movie
                  v-if="!movie.isWatched"
                  :movie="movie"
                />
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import movie from '../components/movies/movie.vue'

import { useMovieStore } from '../store/movieStore/storeMovie'

const movieStore = useMovieStore()
</script>

<style>
</style>
