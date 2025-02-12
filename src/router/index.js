import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Home from '@/views/Home.vue'
import Signup from '@/views/Signup.vue'
import Login from '@/views/Login.vue'



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path:'/login',
      name:'Login',
      component: Login,
    }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.accessToken;

  if (!isAuthenticated && to.path === "/"){
    next("/login");
  } else if (isAuthenticated && to.path === '/login'){
    next("/");
  }else {
    next();
  }
})

export default router
