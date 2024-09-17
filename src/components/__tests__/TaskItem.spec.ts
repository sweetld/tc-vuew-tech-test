// TaskItem.spec.ts
import { mount } from '@vue/test-utils'
import TaskItem from '@/components/TaskItem.vue'
import { useTaskStore } from '@/stores/taskStore'
import { createTestingPinia } from '@pinia/testing'
import { describe, it, expect } from 'vitest'

describe('TaskItem.vue', () => {
  it('should render task title and buttons', () => {
    const task = { id: '123', title: 'Test Task', completed: false }

    const wrapper = mount(TaskItem, {
      props: { task },
      global: {
        plugins: [createTestingPinia()]
      }
    })

    expect(wrapper.find('p').text()).toBe('Test Task')
    expect(wrapper.find('button.delete-btn').exists()).toBe(true)
  })

  it('should mark task as completed when checkbox is clicked', async () => {
    const task = { id: '123', title: 'Test Task', completed: false }

    const wrapper = mount(TaskItem, {
      props: { task },
      global: {
        plugins: [createTestingPinia({ stubActions: false })]
      }
    })

    await (wrapper.find('input[type="checkbox"]').element as HTMLInputElement).click()

    const taskStore = useTaskStore()
    expect(taskStore.toggleTask).toHaveBeenCalledWith('123')
  })

  it('should delete task when delete button is clicked', async () => {
    const task = { id: '123', title: 'Test Task', completed: false }

    const wrapper = mount(TaskItem, {
      props: { task },
      global: {
        plugins: [createTestingPinia({ stubActions: false })]
      }
    })

    await wrapper.find('button.delete-btn').trigger('click')

    const taskStore = useTaskStore()
    expect(taskStore.deleteTask).toHaveBeenCalledWith('123')
  })
})
