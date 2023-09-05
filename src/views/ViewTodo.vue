<template>
  <v-container>
    <v-col>
      <v-row>
        <h1 class="main-title ma-3">Working with Todo...</h1>
      </v-row>
    </v-col>
    <v-col>
      <v-card>
        <div class="teame-line">
          <span>
            Not hung:
          </span>
        </div>
        <v-row class="pa-5" justify="start">
          <v-btn
            @click="todoStore.toggleCreateDialog = !todoStore.toggleCreateDialog"
            color="#3f51b5"
            style="color: white;"
          >
            Create
          </v-btn>
        </v-row>
        <h3 class="ma-3">Found {{ todoStore.upTodosCompleted.length }} todos</h3>
        <v-col>
          <v-row
            v-for="todo of todoStore.upTodosCompleted"
            :key="todo.id"
          >
            <v-col>
              <todo
                draggable="true"
                :todo="todo"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <div
          class="teame-line"
        >
          <span>
            Completed:
          </span>
        </div>
        <h3 class="ma-3">Found {{ todoStore.downTodosCompleted.length }} todos</h3>
        <v-col>
          <v-row
            v-for="todo of todoStore.downTodosCompleted"
            :key="todo.id"
          >
          <v-col>
            <todo
              draggable="true"
              :todo="todo"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-card>
    </v-col>
    <v-dialog
      v-model="todoStore.toggleCreateDialog"
      width="auto"
    >
      <v-card>
        <v-form validate-on="submit lazy" @submit.prevent="submit">
          <v-card-item>
            <v-text-field
              autofocus
              autocomplete="off"
              :counter="10"
              label="Title"
              placeholder="Enter Title"
              v-model="todoStore.state.inpTodoTitle"
            />
          </v-card-item>
          <v-card-item>
            <v-checkbox-btn
              label="Completed"
              v-model="todoStore.state.checkboxInp"
            />
          </v-card-item>
          <v-card-actions>
            <v-btn

              class="search-btn"
              color="#3f51b5"
              @click="todoStore.createTodo"
            >
              Create todo
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script setup>
import { useTodoStore } from '../store/todoStore/todoStore'
import { ref } from 'vue'
import todo from '@/components/Todo.vue';

const todoStore = useTodoStore()

const serchInp = ref('')

</script>

<style scoped>
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
  height: 40px;
  margin: 28px 20px;
  color: #ffffff;
}
.teame-line {
  background: #3f51b5; height: 35px; padding: 5px 0 0 10px; color: white;
}
</style>
