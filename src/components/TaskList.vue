<template>
  <div>
    <div class="flex justify-center space-x-4 mb-4">
      <ButtonComponent @click="setFilter('all')" :variant="buttonVariant('all')"
        >All</ButtonComponent
      >
      <ButtonComponent @click="setFilter('active')" :variant="buttonVariant('active')"
        >Active</ButtonComponent
      >
      <ButtonComponent @click="setFilter('completed')" :variant="buttonVariant('completed')"
        >Completed</ButtonComponent
      >
      <ButtonComponent @click="clearCompleted()" variant="destructive">Clear Completed</ButtonComponent>
    </div>
    <ul>
      <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task" />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TaskItem from '../components/TaskItem.vue'
import { ButtonComponent } from './ui/button'

export default defineComponent({
  components: { TaskItem, ButtonComponent },
  setup() {
    const taskStore = useTaskStore()
    const filter = ref<'all' | 'active' | 'completed'>('all')

    const filteredTasks = computed(() => {
      switch (filter.value) {
        case 'active':
          return taskStore.tasks.filter((task) => !task.completed)
        case 'completed':
          return taskStore.tasks.filter((task) => task.completed)
        default:
          return taskStore.tasks
      }
    })

    const setFilter = (filterType: 'all' | 'active' | 'completed') => {
      filter.value = filterType
    }

    const buttonVariant = (type: 'all' | 'active' | 'completed') => {
      return filter.value === type ? 'default' : 'secondary'
    }

    const clearCompleted = () => {
      taskStore.clearCompleted()
    }

    return { filteredTasks, setFilter, buttonVariant, clearCompleted }
  }
})
</script>
