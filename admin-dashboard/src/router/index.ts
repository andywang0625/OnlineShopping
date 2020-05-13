import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue';
import Login from "../views/Login.vue";
import Logout from "../components/Logout.vue";
import EditPost from "@/views/EditPostPage.vue";
import axios from "axios";
import {UserModule} from "@/store/module/user";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
      path: '/',
      name: "Home",
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
  {
      path: '/edit/:id',
      name: "Edit",
      component: EditPost,
      props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next)=>{
    console.log('Router to ', to.name);
    if(to.name !== 'Login'){
        if(Vue.cookies.get("admin-token")){
            const token = Vue.cookies.get("admin-token");
            axios({
                url: `${process.env.VUE_APP_HOST}:8000/api/admin/islogin`,
                method: "POST",
                data:{
                    token: token,
                }
            }).then((response: any)=>{
                UserModule.updateToken(token);
                UserModule.updateName(response.data.name);
                UserModule.updateEmail(response.data.email);
                const userInfo = UserModule.userInfo;
                //console.log('Router', userInfo);
                if(userInfo.token&&userInfo.email&&userInfo.name){
                    next();
                }
                else{
                    next("/login");
                }
            });
        }else{
            next("/login");
        }
    }else{
        next();
    }
});

export default router
