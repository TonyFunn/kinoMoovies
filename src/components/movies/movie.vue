<template>
  <v-card class="background-card">
    <v-row class="background-img-text">
      <img cover class="movies-img text-white" :src="`${movie.posterUrlPreview}`">
      <v-col>
        <div class="card-text">
          <v-card-title v-if="movie.nameRu">Name Rus: <br />{{ movie.nameRu }}</v-card-title>
          <v-card-title v-if="movie.nameEn">Name Eng: <br />{{ movie.nameEn }}</v-card-title>
          <v-card-title v-if="movie.nameOriginal">Name Orig: <br />{{ movie.nameOriginal }}</v-card-title>
          <v-card-text v-if="movie.genres.length">
            <span>Genres:
              <div
                v-for="genres of movie.genres"
                :key="genres.genre"
              >
                <span>{{ genres.genre }}</span>
              </div>
            </span>
          </v-card-text>
          <v-card-text v-if="movie.overview">Description: {{ movie.overview }}</v-card-text>
          <v-card-text v-if="movie.countries">
            <span>
              Countries:
              <div
                v-for="country of movie.countries"
                :key="country.country"
              >
              {{ country.country }}
              </div>
            </span>
          </v-card-text>
          <v-card-text v-if="movie.year">Year: {{ movie.year }}</v-card-text>
        </div>
        <v-card-text>
          <v-row
            class="mx-0"
          >
            <v-rating
              v-if="movie.ratingImdb"
              :model-value="movie.ratingImdb"
              color="amber"
              density="compact"
              half-increments
              readonly
              size="small"
              length="10"
            ></v-rating>
            <div class="black ms-4">
              {{ movie.ratingImdb }}
            </div>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-row
          justify="space-around"
          align="end"
          no-gutters
          style="height: 170px;"
          v-if="!isSearch"
        >
          <v-card-actions>
              <v-btn @click="$router.push(`/favorite/${movie.kinopoiskId}`)">
                Открыть
              </v-btn>
              <v-btn
                variant="flat"
                color="blue"
                text-color="white"
                @click="movie.isWatched = !movie.isWatched"
              >
                {{ movie.isWatched? 'Unwatched' : 'Watched' }}
              </v-btn>

              <v-btn @click="movieStore.movieDelete(movie.kinopoiskId)" variant="tonal">Delete</v-btn>
          </v-card-actions>
        </v-row>
        <v-row
          justify="space-around"
          align="end"
          no-gutters
          style="height: 170px;"
          v-else
        >
          <v-card-actions>
              <v-btn
                variant="flat"
                color="#009688"
                @click="movieSearch.addFavoriteMovie(movie)"
              >
                <span style="color: #ffffff;">Add to view</span>
              </v-btn>
          </v-card-actions>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { useMovieStore } from '../../store/movieStore/storeMovie'
import { useMovieSearch } from '../../store/movieStore/SearchMovie'

const movieSearch = useMovieSearch()
const movieStore = useMovieStore()
const props = defineProps({
  movie: {
    type: Object,
    required: true,
    defoult: () => {}
  },
  isSearch: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<style scoped>
.background-card {
  padding:20px;
  background-color: rgba(218, 220, 223, 0.842);
  border-radius: 15px;
}
.background-img-text {
  background-color: white;
  border-radius: 15px;
}
.movies-img {
  border-radius: 15px 0 0 15px;
}
.card-text {
  max-width: 400px;
}
</style>

