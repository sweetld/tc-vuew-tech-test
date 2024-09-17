<template>
  <div class="max-w-4xl mx-auto p-5">
    <h1 class="text-4xl font-bold mb-4 text-center">To-Do List</h1>
    <AddTask />
    <TaskList />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import AddTask from '@/components/AddTask.vue'
import TaskList from '@/components/TaskList.vue'

export default defineComponent({
  components: { AddTask, TaskList },
  setup() {
    const taskStore = useTaskStore()

    onMounted(() => {
      taskStore.loadTasks()
    })

    return {}
  }
})
</script>
