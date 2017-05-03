import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import FillariMap from '@/components/FillariMap'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FillariMap',
      component: FillariMap
    }
  ]
})
