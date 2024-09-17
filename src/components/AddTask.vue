<template>
  <form @submit.prevent="handleAddTask" class="flex items-center space-x-2 mb-4">
    <input
      v-model="taskTitle"
      type="text"
      placeholder="Enter a new task"
      aria-label="Task Title"
      class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    <ButtonComponent type="submit" size="lg"> Add Task </ButtonComponent>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { ButtonComponent } from './ui/button'

export default defineComponent({
  components: { ButtonComponent },
  setup() {
    const taskTitle = ref('')
    const taskStore = useTaskStore()

    const handleAddTask = () => {
      if (taskTitle.value.trim()) {
        taskStore.addTask(taskTitle.value)
        taskTitle.value = ''
      }
    }

    return { taskTitle, handleAddTask }
  }
})
</script>
