<template>
  <v-container>
    <v-row>
      <h1 class="main-title ma-3">Working with posts...</h1>
    </v-row>
    <v-dialog
      v-model="state.loaderPosts"
      width="auto"
    >
      <v-progress-circular
        indeterminate
        color="#795548"
        :size="121"
      ></v-progress-circular>
    </v-dialog>
    <v-card>
      <v-tabs
        v-model="myPostStore.state.tab"
        bg-color="#795548"
      >
        <v-tab style="color: #ffffff;" value="one">All Posts</v-tab>
        <v-tab style="color: #ffffff;" value="two">My Posts</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="myPostStore.state.tab">
          <v-window-item value="one">
            <v-row>
              <v-col width="100%">
                <input
                  autofocus
                  autocomplete="off"
                  type="text"
                  data-error="Ошибка"
                  placeholder="Enter Title Post"
                  class="search-input"
                  v-model.trim="searchPost"
                >
              </v-col>
              <v-col>
                <v-btn
                  class="search-btn"
                  color="#795548"
                  @click="resulStearchPost()"
                >
                  Search
                </v-btn>
              </v-col>
            </v-row>
            <v-row
              v-for="post of state.posts"
              :key="post.id"
            >
              <v-col>
                <Post
                :post="post"
                @delete="deletePost"
                />
              </v-col>
            </v-row>
            <div
              v-intersect="{
                handler: onIntersect,
                options: {
                  rootMargin: '0px',
			            threshold: 1.0
                }
              }"
            ></div>
          </v-window-item>
          <v-window-item value="two">
            <v-col>
              <v-form validate-on="submit lazy" @submit.prevent="submit">
                <v-col>
                  <v-text-field
                    autofocus
                    autocomplete="off"
                    :counter="10"
                    :error-messages="myPostStore.title.errorMessage"
                    label="Title"
                    placeholder="Enter Title"
                    v-model="myPostStore.title.value"
                  />
                  <v-text-field
                    autocomplete="off"
                    :counter="100"
                    :error-messages="myPostStore.body.errorMessage"
                    label="Description"
                    placeholder="Enter Description"
                    v-model="myPostStore.body.value"
                  />
                </v-col>
                <v-row justify="end">
                  <v-btn
                    class="search-btn"
                    color="#795548"
                    @click="myPostStore.createPost"
                  >
                    Create Post
                  </v-btn>
                  <v-btn
                    class="search-btn"
                    color="#795548"
                    @click="myPostStore.handleReset"
                  >
                    Clear
                  </v-btn>
                </v-row>
              </v-form>

              <v-row
                v-for="post of myPostStore.state.posts"
                :key="post.id"
              >
                <v-col>
                  <Post
                    :post="post"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import axios from 'axios'
import { useMyPostsStore } from '../store/postStore/MyPostsStore'
import Post from '@/components/Post.vue'
import { onMounted, reactive } from 'vue'


const myPostStore = useMyPostsStore()

const state = reactive({
  posts: [],
  searchPost: '',

  loaderPosts: false,
  isIntersecting: false,

  page: 1,
  limit: 10,
  totalPages: 0
})

const onIntersect = (isIntersecting, entries, observer) => {
  isIntersecting = entries[0].intersectionRatio && state.page < state.totalPages
  if (entries[0].intersectionRatio && state.page < state.totalPages) {
    loadingMorePost()
  }
}

const deletePost = (post) => {
  state.posts = state.posts.filter((itemPost) => itemPost.id !== post.id)
}

const fatchPosts = async () => {
  try {
    state.loaderPosts = true
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts?',
      {
        params: {
          _page: state.page,
          _limit: state.limit
        }
      }
    )
    state.totalPages = Math.ceil(
      response.headers['x-total-count'] / state.limit
    )
    state.posts = response.data
  } catch (e) {
    alert(e, 'Ошибка!!!')
  } finally {
    state.loaderPosts = false
  }
}
const loadingMorePost =  async () => {
  try {
    state.page += 1
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts?',
      {
        params: {
          _page: state.page,
          _limit: state.limit
        }
      }
    )
    state.totalPages = Math.ceil(
      response.headers['x-total-count'] / state.limit
    )
    state.posts = [...state.posts, ...response.data]
  } catch (e) {
    console.error(e)
    alert('Ошибка!!!')
  }
}

const resulStearchPost = () => {
  state.posts = state.posts.filter((post) => {
    post.title.toLowerCase().includes(state.searchPost.toLowerCase())
  })
}



onMounted(() => {
  fatchPosts()
})
</script>

<style>
.search-input {
  border: 1 solid #e7e7e7;
  width: 100%;
  height: 30px;
  margin: 20px;
  padding: 0 10px;
  background-color: rgba(218, 220, 223, 0.842);
  border-radius: 5px;
}
.search-btn {
  height: 30px;
  margin: 20px;
  color: #ffffff;
}
::placeholder {
  color: black;
}
</style>
