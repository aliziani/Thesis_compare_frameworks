import { createRouter, createWebHashHistory } from 'vue-router'
import App from '../App.vue'

const routes = [
  {
    path: '/:visibility?',
    name: 'home',
    component: App
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes : routes
})

export default router
