<template>
  <v-app-bar app :color="`${mainStore.toggleColor(state.value)}`" dark>
    <v-app-bar-title>
      <div
        class="d-flex align-center"
        @click.prevent="`${$router.push('/')}${state.value = 4}`"
        style="cursor: pointer"
      >
        <v-icon size="25" icon="mdi-rocket-launch" />
        <div
          class="text-h6"
        >LastNewWorld</div>
      </div>
    </v-app-bar-title>

    <v-top-navigation>
      <v-btn
        @click="$router.push('/movies'); state.value = 0"
      >
        <v-icon size="25">mdi-television-play</v-icon>
        <span>Movies</span>
      </v-btn>

      <v-btn
        @click="`${$router.push('/favorite')}${state.value = 1}`"
      >
        <v-icon size="25">mdi-heart</v-icon>
        <span>favorite movies</span>
      </v-btn>

      <v-btn
        @click="`${$router.push('/posts')}${state.value = 2}`"
      >
        <v-icon size="25">mdi-pen</v-icon>
        <span>Posts</span>
      </v-btn>

      <v-btn
        value="Todo"
        @click="`${$router.push('/todo')}${state.value = 3}`"
      >
        <v-icon size="25">mdi-book</v-icon>
        <span>To do</span>
      </v-btn>
    </v-top-navigation>
  </v-app-bar>
</template>

<script setup>
import {useMainStore} from "@/store/main"
import { reactive } from "vue";

const mainStore = useMainStore()

const state = reactive({
  value: 0
})

</script>
