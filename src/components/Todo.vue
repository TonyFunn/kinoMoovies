<template>
  <v-card class="background-card">
    <v-row no-gutters class="background-text">
      <v-col>
        <div>
          <v-card-text>{{ todo.title }}</v-card-text>
          <v-card-text>
            <v-checkbox-btn
              v-model="todo.completed"
            ></v-checkbox-btn>
          </v-card-text>
        </div>
      </v-col>
      <v-row
        justify="end"
        no-gutters
        style="height: 120px;"
      >
        <v-card-actions>
          <v-btn
            @click="todoStore.deleteTodo(todo.id)" variant="tonal"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-row>
    </v-row>
  </v-card>
</template>

<script setup>
import { useTodoStore } from '@/store/todoStore/todoStore';

const props = defineProps({
  todo: {
    type: Object,
    required: true,
    defoult: () => {}
  }
})

const todoStore = useTodoStore()

</script>

<style scoped>
.background-card {
  padding:20px;
  background-color: rgba(218, 220, 223, 0.842);
  border-radius: 15px;
}
.background-text {
  background-color: white;
  border-radius: 15px;
}
</style>
