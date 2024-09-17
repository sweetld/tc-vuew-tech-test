// taskStore.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import { describe, beforeEach, it, expect } from 'vitest'

describe('taskStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds a new task', () => {
    const store = useTaskStore()
    store.addTask('New Task')

    expect(store.tasks.length).toBe(1)
    expect(store.tasks[0].title).toBe('New Task')
  })

  it('updates a task title', () => {
    const store = useTaskStore()
    store.addTask('Old Task')
    store.updateTask(store.tasks[0].id, 'Updated Task')

    expect(store.tasks[0].title).toBe('Updated Task')
  })

  it('toggles task completion', () => {
    const store = useTaskStore()
    store.addTask('Task to complete')

    store.toggleTask(store.tasks[0].id)

    expect(store.tasks[0].completed).toBe(true)
  })

  it('deletes a task', () => {
    const store = useTaskStore()
    store.addTask('Task to delete')

    store.deleteTask(store.tasks[0].id)

    expect(store.tasks.length).toBe(0)
  })

  it('saves and loads tasks from localStorage', () => {
    const store = useTaskStore()

    store.addTask('Task to persist')
    store.saveTasks()

    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    expect(savedTasks.length).toBe(1)

    store.tasks = []
    store.loadTasks()
    expect(store.tasks.length).toBe(1)
    expect(store.tasks[0].title).toBe('Task to persist')
  })
})
