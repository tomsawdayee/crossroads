import Vue from 'vue'
import Router from 'vue-router'
import Play from './Play.vue'
import Profile from './views/Profile.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Play
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})


export default router;
