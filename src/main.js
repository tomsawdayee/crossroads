// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from "./router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faCheck, faTimes, faStar, faCoins, faHeartbeat, faBrain, faUsers} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
library.add(faCheck)
library.add(faTimes)
library.add(faStar)
library.add(faCoins)
library.add(faHeartbeat)
library.add(faBrain)
library.add(faUsers)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
