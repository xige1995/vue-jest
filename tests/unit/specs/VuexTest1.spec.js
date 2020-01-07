import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VuexTest1 from '@/components/VuexTest1'
import storeConfig from '@/store/store-config.js'
import _ from 'lodash'

// localVue 是一个独立作用域的 Vue 构造函数，我们可以对其进行改动而不会影响到全局的 Vue 构造函数
const localVue = createLocalVue()

localVue.use(Vuex)

describe('VuexTest1.vue', () => {
  let actions
  let getters
  let store

  beforeEach(() => {
    actions = {
      actionClick: jest.fn(), // 通过jest.fn() 生成一个mock函数
      actionInput: jest.fn()
    }
    getters = {
      clicks: () => 2,
      inputValue: () => 'input'
    }

    //  伪造了一个 store 并填入假数据
    store = new Vuex.Store({
      state: {},
      getters,
      actions
    })
  })

  it('dispatches "actionInput" when input event value is "input"', () => {
    const wrapper = shallowMount(VuexTest1, { store, localVue })
    const input = wrapper.find('input')
    input.element.value = 'input'
    input.trigger('input')
    expect(actions.actionInput).toHaveBeenCalled() // 表示函数已经被调用
  })

  it('does not dispatch "actionInput" when event value is not "input"', () => {
    const wrapper = shallowMount(VuexTest1, { store, localVue })
    const input = wrapper.find('input')
    input.element.value = 'not input'
    input.trigger('input')
    expect(actions.actionInput).not.toHaveBeenCalled()
  })

  it('calls store action "actionClick" when button is clicked', () => {
    const wrapper = shallowMount(VuexTest1, { store, localVue })
    wrapper.find('button').trigger('click')
    expect(actions.actionClick).toHaveBeenCalled()
  })

  it('VuexTest1.vue 测试getter', () => {
    const wrapper = shallowMount(VuexTest1, { store, localVue })
    const p = wrapper.find('p')
    expect(p.text()).toBe(getters.inputValue())
  })

  it('VuexTest1.vue 测试getter1', () => {
    const wrapper = shallowMount(VuexTest1, { store, localVue })
    const p = wrapper.findAll('p').at(1)
    expect(p.text()).toBe(getters.clicks().toString())
  })
})

test('increments "count" value when "increment" is commited', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(_.cloneDeep(storeConfig))
  expect(store.state.count).toBe(0)
  store.commit('increment')
  expect(store.state.count).toBe(1)
})

test('updates "evenOrOdd" getter when "increment" is commited', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(_.cloneDeep(storeConfig))
  expect(store.getters.evenOrOdd).toBe('even')
  store.commit('increment')
  expect(store.getters.evenOrOdd).toBe('odd')
})
