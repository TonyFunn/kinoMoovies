<template>
  <v-container>
    <v-card class="background-card">
      <v-col class="background-img-text">
        <v-row>
          <img cover class="movies-img text-white" :src="`${state.movie.posterUrlPreview}`">
          <v-col>
            <div class="card-text">
              <v-card-title v-if="state.movie.nameRu">Name Rus: <br />{{ state.movie.nameRu }}</v-card-title>
              <v-card-title v-if="state.movie.nameEn">Name Eng: <br />{{ state.movie.nameEn }}</v-card-title>
              <v-card-title v-if="state.movie.nameOriginal">Name Orig: <br />{{ state.movie.nameOriginal }}</v-card-title>
              <v-card-text v-if="state.movie.genres">
                <span>
                  Genres:
                  <div
                    v-for="genres of state.movie.genres"
                    :key="genres.genre"
                  >
                    <span>{{ genres.genre }}</span>
                  </div>
                </span>
              </v-card-text>
              <v-card-text v-if="state.movie.overview">Description: {{ state.movie.overview }}</v-card-text>
              <v-card-text v-if="state.movie.countries">
                <span>
                  Countries:
                  <div
                    v-for="country of state.movie.countries"
                    :key="country.country"
                  >
                  {{ country.country }}
                  </div>
                </span>
              </v-card-text>
              <v-card-text v-if="state.movie.filmLength">Film length: <br />{{ state.movie.filmLength }} min</v-card-text>
              <v-card-text v-if="state.movie.year">Year: <br />{{ state.movie.year }}</v-card-text>
            </div>
            <v-card-text>
              <v-row
                class="mx-0"
              >
                <v-rating
                  v-if="state.movie.ratingImdb"
                  :model-value="state.movie.ratingImdb"
                  color="amber"
                  density="compact"
                  half-increments
                  readonly
                  size="small"
                  length="10"
                ></v-rating>
                <div class="black ms-4">
                  {{ state.movie.ratingImdb }}
                </div>
              </v-row>
            </v-card-text>
          </v-col>
        </v-row>
        <v-row class="slogan">
          <v-card-title v-if="state.movie.slogan">
            Slogan:
          </v-card-title>
          <span>{{ state.movie.slogan }}</span>
        </v-row>
        <v-row class="descriptionMovie">
          <v-card-title v-if="state.movie.description">
            Description:
          </v-card-title>
          <span>{{ state.movie.description }}</span>
        </v-row>
        <v-row class="interestingFacts"
          v-if="state.facts.length"
        >
          <v-card-title class="interestingFacts_title">
            Interesting Facts:
          </v-card-title>
          <v-card
            flat
          >
            <v-card-actions
              class="justify-space-between" 
            >
              <v-btn
                variant="plain"
                icon="mdi-chevron-left"
                @click="prevFact"
              ></v-btn>
                <v-window v-model="state.onboarding">
                  <v-window-item
                    v-for="fact in state.facts"
                    :key="fact"

                  >
                    <v-card
                      height="200"
                      class="d-flex justify-center align-center"
                      width="708"
                    >
                      <span
                        v-html="fact.text"
                        class="facts_delete-a"
                      ></span>
                    </v-card>
                  </v-window-item>
                </v-window>
              <v-btn
                variant="plain"
                icon="mdi-chevron-right"
                @click="nextFact"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
        <v-card-actions class="movie-actions">
          <v-btn
            variant="flat"
            color="#009688"
            @click="movieSearch.addFavoriteMovie(state.movie)"
          >
            <span style="color: #ffffff;">Add to view</span>
          </v-btn>
        </v-card-actions>
        <v-row class="similarsMovie">
          <v-data-iterator
            :items-per-page="3"
          >
            <template v-slot:default>
              <v-container class="pa-2" fluid>
                <v-row dense>
                  <v-col
                    v-for="similar in state.similars"
                    :key="similar.nameRu"
                    cols="auto"
                    md="3"
                  >
                    <v-card
                      class="pb-3 similarsMovie-card"
                      border
                      flat
                      :width="200"
                      @click="$router.push(`/favorite/${similar.filmId}`)"
                    >
                      <v-img
                        :src="`${similar.posterUrlPreview}`"
                      ></v-img>
                      <v-list-item class="mb-2">
                        <template v-slot:title>
                          <strong class="text-h6 mb-2">{{ similar.nameRu }}</strong>
                        </template>
                      </v-list-item>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </v-data-iterator>
        </v-row>
      </v-col>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieSearch } from '@/store/movieStore/SearchMovie'

const movieSearch = useMovieSearch()
const route = useRoute()

const state = reactive({
  movie: [],
  facts: [],
  onboarding: 0,
  similars: []
})

const fetchMovei = async () => {
  const result = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${route.params.id}`,
    {
      method: 'GET',
      headers: {
        'X-API-KEY': 'b5b4a886-9a07-4581-9533-2944412ab7dd',
        'Content-Type': 'application/json'
      }
    }
  ).then(res => res.json()).catch(err => console.log(err))
  state.movie = result
}

const fetchMoveiFacts = async () => {
  const result = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${route.params.id}/facts`,
    {
      method: 'GET',
      headers: {
        'X-API-KEY': 'b5b4a886-9a07-4581-9533-2944412ab7dd',
        'Content-Type': 'application/json'
      }
    }
  ).then(res => res.json()).catch(err => console.log(err))
  state.facts = result.items
}

const fetchMoveiSimilars = async () => {
  const result = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${route.params.id}/similars`,
    {
      method: 'GET',
      headers: {
        'X-API-KEY': 'b5b4a886-9a07-4581-9533-2944412ab7dd',
        'Content-Type': 'application/json'
      }
    }
  ).then(res => res.json()).catch(err => console.log(err))
  state.similars = result.items
}

//FancWindowFacts
const nextFact = () => {
  state.onboarding = state.onboarding + 1 > state.facts.length
    ? 1
    : state.onboarding + 1
}
const prevFact = () => {
  state.onboarding = state.onboarding - 1 <= 0
    ? state.facts.length
    : state.onboarding - 1
}

watch(() => {
  route.params,
  fetchMovei()
  fetchMoveiFacts()
  fetchMoveiSimilars()
})

onMounted(() => {
  fetchMovei()
  fetchMoveiFacts()
  fetchMoveiSimilars()
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
.slogan {
  padding: 30px 56px;
  align-items: center;
}
.descriptionMovie {
  padding: 30px 56px;
}
.interestingFacts {
  padding: 30px 0;
  align-items: center;
}
.movie-actions {

}
.similarsMovie {
  padding: 30px 56px;
}
.similarsMovie-card {
  gap: 15px;
  cursor: pointer;
}
.similarsMovie-card:hover {
  box-shadow: 2px 2px 10px;
}
.similarsMovie-img {
  width: 360px;
  height: 540px;
}
.interestingFacts_title {
  padding-left: 72px;
}
.movies-img {
  border-radius: 15px 0 15px 0;
}
.card-text {
  max-width: 400px;
}
</style>
    