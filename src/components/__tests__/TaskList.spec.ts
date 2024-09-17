// TaskList.spec.ts
import { mount } from '@vue/test-utils'
import TaskList from '@/components/TaskList.vue'
import { createTestingPinia } from '@pinia/testing'
import { describe, it, expect } from 'vitest'

describe('TaskList.vue', () => {
  it('should render a list of tasks', () => {
    const wrapper = mount(TaskList, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            taskStore: { tasks: [{ id: 1, title: 'Task 1', completed: false }] }
          }
        })]
      }
    })

    expect(wrapper.findAll('li').length).toBe(1)
    expect(wrapper.find('li').text()).toContain('Task 1')
  })

  it('should filter tasks by status', async () => {
    const wrapper = mount(TaskList, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            taskStore: {
              tasks: [
                { id: 1, title: 'Task 1', completed: false },
                { id: 2, title: 'Task 2', completed: true }
              ]
            }
          }
        })]
      }
    })

    await wrapper.find('button.filter-completed').trigger('click')

    expect(wrapper.findAll('li').length).toBe(1)
    expect(wrapper.find('li').text()).toContain('Task 2')
  })
})
