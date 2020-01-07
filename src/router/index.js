import Vue from 'vue'
import Router from 'vue-router'

import Test from '@/components/Test'
import Event from '@/components/Event'
import VuexTest from '@/components/VuexTest'
import AsyncEvent from '@/components/AsyncEvent'
import RouterTest from '@/components/RouterTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Test',
      component: Test
    },
    {
      path: '/event',
      name: 'Event',
      component: Event
    },
    {
      path: '/vuexevent',
      name: 'VuexTest',
      component: VuexTest
    },
    {
      path: '/routerTest',
      name: 'routerTest',
      component: RouterTest
    },
    {
      path: '/asyncEvent',
      name: 'asyncEvent',
      component: AsyncEvent
    }
  ]
})
