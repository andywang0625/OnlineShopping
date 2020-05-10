import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue';
import Login from "../components/Login.vue";
import Logout from "../components/Logout.vue";
import {UserModule} from "@/store/module/user";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
      path: '/login',
      name: "Login",
      component: Login,
  },
  {
      path: '/logout',
      name: "Logout",
      component: Logout,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next)=>{
    if(to.name !== 'Login'){
        const userInfo = UserModule.userInfo;
        if(userInfo.token&&userInfo.email&&userInfo.name)
            next();
        else
            next("/login");
    }else{
        next();
    }

});

export default router
