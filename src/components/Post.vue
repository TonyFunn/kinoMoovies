<template>
  <v-card class="background-card">
    <v-row class="background-img-text">
      <v-col>
        <div>
          <v-card-title
            v-if="myPostStore.state.tab == 'one'"
          >
            <span>№</span>{{ post.id }}
          </v-card-title>
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text>{{ post.body }}</v-card-text>
        </div>
      </v-col>
      <v-row
        justify="end"
        no-gutters
        style="height: 170px;"
      >
        <v-card-actions>
          <v-btn
            v-if="myPostStore.state.tab == 'one'"
            @click="$emit('delete', post)"
            variant="tonal"
          >
            Delete
          </v-btn>
          <v-btn
            v-if="myPostStore.state.tab == 'two'"
            @click="myPostStore.postDelete(post.id)" variant="tonal"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-row>
    </v-row>
  </v-card>
</template>

<script setup>
import { useMyPostsStore } from '@/store/postStore/MyPostsStore';

const props = defineProps({
  post: {
    type: Object,
    required: true,
    defoult: () => {}
  }
})

const myPostStore = useMyPostsStore()

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
.card-text {
  max-width: auto;
}
</style>
