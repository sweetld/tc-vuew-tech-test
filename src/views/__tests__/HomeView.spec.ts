// HomeView.spec.ts
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import { createTestingPinia } from '@pinia/testing'
import { describe, it, expect } from 'vitest'

describe('HomeView.vue', () => {
  it('should render AddTask and TaskList components', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createTestingPinia()]
      }
    })

    expect(wrapper.findComponent({ name: 'AddTask' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'TaskList' }).exists()).toBe(true)
  })
})
