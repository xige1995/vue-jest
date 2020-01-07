import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import RouterTest from '@/components/RouterTest'

const localVue = createLocalVue()
localVue.use(VueRouter)

const router = new VueRouter()
const $route = {
  path: '/some/path'
}

// 在一个 localVue 上安装 Vue Router 时也会将 $route 和 $router 作为两个只读属性添加给该 localVue
shallowMount(RouterTest, {
  localVue,
  router
})

describe('VuexTest.vue', () => {
  const wrapper = shallowMount(RouterTest, {
    mocks: {
      $route
    }
  })
  it('RouterTest.vue 测试', () => {
    expect(wrapper.vm.$route.path).toBe('/some/path')
  })
})
