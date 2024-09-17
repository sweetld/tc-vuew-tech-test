<template>
  <li class="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-2">
    <div class="flex items-center space-x-3">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="toggleTaskCompletion"
        class="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
      />
      <span v-if="!isEditing" :class="{ 'line-through text-gray-400': task.completed }">
        {{ task.title }}</span
      >
      <input
        v-else
        type="text"
        v-model="editedTitle"
        @keyup.enter="updateTask"
        class="w-full px-2 py-1 border border-gray-300 rounded-md"
      />
    </div>
    <div class="flex space-x-2">
      <ButtonComponent @click="startEditing" variant="link" :disabled="task.completed" class="text-blue-600 hover:underline"
        >Edit</ButtonComponent
      >
      <ButtonComponent @click="deleteTask" variant="destructive" size="sm">Delete</ButtonComponent>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTaskStore, type Task } from '@/stores/taskStore'
import { ButtonComponent } from './ui/button'

export default defineComponent({
  components: { ButtonComponent },
  props: {
    task: {
      type: Object as () => Task,
      required: true
    }
  },
  setup(props) {
    const isEditing = ref(false)
    const editedTitle = ref(props.task.title)
    const taskStore = useTaskStore()

    const startEditing = () => {
      isEditing.value = true
    }

    const updateTask = () => {
      if (editedTitle.value.trim()) {
        taskStore.updateTask(props.task.id, editedTitle.value)
        isEditing.value = false
      }
    }

    const toggleTaskCompletion = () => {
      taskStore.toggleTask(props.task.id)
    }

    const deleteTask = () => {
      taskStore.deleteTask(props.task.id)
    }

    return { isEditing, editedTitle, startEditing, updateTask, toggleTaskCompletion, deleteTask }
  }
})
</script>
