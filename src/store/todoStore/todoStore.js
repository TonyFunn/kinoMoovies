import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const useTodoStore = defineStore('_todostore', () => {

  const state = reactive({
    todos: [
      {
        id: 1,
        title: 'Textq',
        completed: false,
      },
      {
        id: 2,
        title: '12313123123',
        completed: false,
      },
      {
        id: 3,
        title: 'Aadawdawdawdawdadadaw',
        completed: true,
      }
    ],
    loader: false,
    toggleCreateDialog: false,

    //Form
    checkboxInp: false,
    inpTodoTitle: ''
  })

  const upTodosCompleted = computed(() => {
    return state.todos.filter((todo) => !todo.completed)
  })
  const downTodosCompleted = computed(() => {
    return state.todos.filter((todo) => todo.completed)
  })

  const deleteTodo = (todoId) => {
    state.todos = state.todos.filter((todo) => todo.id !== todoId)
  }

  const createTodo = () => {
    state.todos.unshift({
      id: Date.now(),
      title: state.inpTodoTitle,
      completed: state.checkboxInp
    })
    state.checkboxInp = false
    state.inpTodoTitle = ''
  }

  // //DragonDrop
  // const getTodoList = (list) => {
  //   return state.todos.filter((todo) => todo.list == list)
  // }
  // const startDrag = (event, item) => {
  //   event.dataTransfer.dropEffect = 'move'
  //   event.dataTransfer.effectAllowed = 'move'
  //   event.dataTransfer.setData('itemId', item.id)
  // }
  // const onDrop = (event, list) => {
  //   const itemId = event.dataTransfer.getData('itemId')
  //   const todo = state.todos.find((item) => item.id === itemId)
  //   todo.list = list
  // }

  return {
    state,
    upTodosCompleted,
    downTodosCompleted,
    createTodo,
    deleteTodo
  }
})
