import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

require("./assets/main.scss"); // our Sass file, which imports Bulma

new Vue({
  render: h => h(App),
}).$mount('#app')
