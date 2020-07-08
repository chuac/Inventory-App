import Vue from 'vue'
import App from './App.vue'
import Routes from './routes'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

require("./assets/main.scss"); // our Sass file, which imports Bulma

Vue.use(VueRouter); // vue-router package
const router = new VueRouter({
  routes: Routes,
  mode: 'history' // https://router.vuejs.org/guide/essentials/history-mode.html#html5-history-mode
});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
