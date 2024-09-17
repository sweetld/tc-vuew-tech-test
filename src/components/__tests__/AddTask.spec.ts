// AddTask.spec.ts
import { mount } from '@vue/test-utils'
import AddTask from '@/components/AddTask.vue'
import { useTaskStore } from '@/stores/taskStore'
import { createTestingPinia } from '@pinia/testing'
import { describe, it, expect } from 'vitest'

describe('AddTask.vue', () => {
  it('should render input and button', () => {
    const wrapper = mount(AddTask, {
      global: {
        plugins: [createTestingPinia()]
      }
    })

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('should add a task when form is submitted', async () => {
    const wrapper = mount(AddTask, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })]
      }
    })

    const input = wrapper.find('input')
    await input.setValue('New Task')
    
    await wrapper.find('form').trigger('submit.prevent')

    const taskStore = useTaskStore()
    expect(taskStore.addTask).toHaveBeenCalledWith('New Task')
  })
})
