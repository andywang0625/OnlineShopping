import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios';
import VueCookies from "vue-cookies-ts";

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.use(ElementUI);
Vue.use(VueCookies);
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
