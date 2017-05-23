import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import IView from 'iview'
import './assets/styles/iview.less'

Vue.use(IView);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
