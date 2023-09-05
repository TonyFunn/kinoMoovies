import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { useField, useForm } from 'vee-validate'

export const useMyPostsStore = defineStore('_myPosts', () => {
  const state = reactive({
    posts: [
      {
        userId: 1,
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        userId: 1,
        id: 2,
        title: "qui est esse",
        body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      }
    ],
    tab: null
  })

  const postInLocalStorage = localStorage.getItem('_posts')
  if (postInLocalStorage) {
    state.posts = JSON.parse(postInLocalStorage)
  }

  //actions
  const postDelete = (postId) => {
    state.posts = state.posts.filter((post) => post.id != postId)
  }

  //Form
  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      title (value) {
        if (value?.length >= 2) return true

        return 'Title needs to be at least 2 characters.'
      },
      body (value) {
        if (value?.length >= 2) return true

        return 'Desc needs to be at least 2 characters.'
      }
    }
  })
  const title = useField('title')
  const body = useField('body')

  const createPost = handleSubmit( values => {
    state.posts.unshift(
      {
        id: Date.now(),
        ...values
      }
    )
    handleReset()
  })

  watch(() => state.posts, (posts) => {
    localStorage.setItem('_posts', JSON.stringify(posts))
  }, {deep: true})

  return {
    state,
    postDelete,
    handleReset,
    createPost,
    title,
    body
  }
})
