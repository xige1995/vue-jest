import { mount, shallowMount } from '@vue/test-utils'
import AsyncEvent from '@/components/AsyncEvent'
import axios from 'axios'
import Users from '@/components/User.js'

describe('AsyncEvent.vue', () => {
  it('异步行为测试', (done) => {
    const wrapper = mount(AsyncEvent)
    wrapper.find('button').trigger('click')
    setTimeout(() => {
      expect(Number(wrapper.find('span').text())).toBe(1)
      done()
    }, 1000)
  })

  it('异步行为测试mock', (done) => {
    const wrapper = mount(AsyncEvent)
    wrapper.find('button.mock').trigger('click')

    setTimeout(() => {
      console.log(wrapper.vm.vlaueMock)
      // expect(wrapper.vm.vlaueMock).toBe('mock value')
      // expect(wrapper.find('#mock').text()).toBe('mock value')
      done()
    }, 1000)
  })
})

jest.mock('axios')
test('should fetch users', () => {
  const wrapper = mount(AsyncEvent)
  const users = [{ name: 'Bob' }]
  const resp = { data: users }
  axios.get.mockResolvedValue(resp)
  // 断言事件已经被触发
  // expect(wrapper.emitted().buttonMock).toBeTruthy()
  // expect(wrapper.vm.$emit('buttonMock')).toEqual(users)
  // return Users.all().then(data => expect(data).toEqual(users))
})
