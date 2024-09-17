import { defineStore } from 'pinia'
import { loadFromLocalStorage, saveToLocalStorage } from '@/lib/localStorageService'

export interface Task {
  id: string
  title: string
  completed: boolean
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[]
  }),
  actions: {
    addTask(taskTitle: string) {
      const uuid = crypto.randomUUID()
      const newTask = { id: uuid, title: taskTitle, completed: false }
      this.tasks.push(newTask)
      this.saveTasks()
    },
    updateTask(id: string, taskTitle: string) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) {
        task.title = taskTitle
        this.saveTasks()
      }
    },
    toggleTask(id: string) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) task.completed = !task.completed
      this.saveTasks()
    },
    deleteTask(id: string) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
      this.saveTasks()
    },
    clearCompleted() {
      this.tasks = this.tasks.filter((t) => !t.completed)
      this.saveTasks()
    },
    saveTasks() {
      saveToLocalStorage('tasks', this.tasks)
    },
    loadTasks() {
      this.tasks = loadFromLocalStorage('tasks')
    }
  }
})
