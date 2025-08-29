import { mount } from '@vue/test-utils'
import { QrbEditor } from 'packages/ash-ui/dist'
import { describe, expect, it } from 'vitest'

describe('QrbEditor.vue', () => {
  it('render editor block', () => {
    const wrapper = mount(QrbEditor)
    wrapper.find('editor').exists()
  })

  // it('text length', async () => {
  //   const wrapper = mount(QrbEditor)
  //   expect(wrapper.find('editor-length').text()).toContain('5 / 300')
  // })
})
