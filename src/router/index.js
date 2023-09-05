// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/movies',
        name: 'movies',
        component: () => import('@/views/ViewMovie.vue'),
      },
      {
        path: '/favorite',
        name: 'favorite',
        component: () => import('@/views/ViewFavoriteMovie.vue'),
      },
      {
        path: '/posts',
        name: 'posts',
        component: () => import('@/views/ViewPosts.vue'),
      },
      {
        path: '/todo',
        name: 'todo',
        component: () => import('@/views/ViewTodo.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
