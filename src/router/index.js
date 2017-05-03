import Vue from 'vue'
import Router from 'vue-router'
import FillariMap from '@/components/FillariMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FillariMap',
      component: FillariMap
    }
  ]
})
