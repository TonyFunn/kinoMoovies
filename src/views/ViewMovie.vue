<template>
  <v-container>
    <v-row>
      <h1 class="main-title ma-3">Find a movie...</h1>
    </v-row>
    <v-dialog
      v-model="searchMovie.state.loader"
      width="auto"
    >
      <v-progress-circular
        indeterminate
        color="#009688"
        :size="121"
      ></v-progress-circular>
    </v-dialog>

    <v-card class="card-tndent">
      <v-tabsv-card-item>
        <v-card-subtitle style="background-color: #009688;">
          <v-form validate-on="submit lazy" @submit.prevent="searchMovie.getMovies(serchInp)">
            <v-row>
              <input
                autofocus
                autocomplete="off"
                type="text"
                data-error="Ошибка"
                placeholder="Enter Name Movie"
                class="search-input"
                v-model="serchInp"
              >
            </v-row>
          </v-form>
        </v-card-subtitle>
        <v-card-text>
          <v-row>
            <h3 class="ma-3">Found {{ searchMovie.state.movies.length }} movies</h3>
          </v-row>
        </v-card-text>
      </v-tabsv-card-item>
      <v-card-text>
        <v-row
          v-for="movie of searchMovie.state.movies"
          :key="movie.kinopoiskId"
        >
          <v-col>
            <movie
              :movie="movie"
              :isSearch="true"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref } from 'vue';
import movie from '../components/movies/movie.vue'
import { useMovieSearch } from "../store/movieStore/SearchMovie";

const searchMovie = useMovieSearch()

const serchInp = ref('')
</script>
<style scoped>
.card-tndent {
  margin-bottom: 15px;
}
.search-input {
  border: 1 solid #e7e7e7;
  width: 100%;
  height: 30px;
  margin: 20px;
  padding: 0 10px;
  background-color: rgba(218, 220, 223, 0.842);
  border-radius: 5px;
}
::placeholder {
  color: black;
}
</style>
