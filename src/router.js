import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'


import Login from './views/Login.vue'
import { Dashboard } from './views/Dashboard'
import { Home } from './views/Home'
import { Users } from './views/Users'
import { UserDetails } from './views/UserDetails'
import { Settings } from './views/Settings'
import { EmailTemplate } from './views/EmailTemplate'
import { Fee } from './views/Fee'
import { UserManagement } from './views/UserManagement'
import { Salary } from './views/Salary'
import { Promotions } from './views/Promotions'
import { Merchants } from './views/Merchants'
import { Messages } from './views/Messages'



import { UserLimitDetails } from './views/UserLimitDetails'
import { ChangeLimit } from './views/ChangeLimit'


Vue.use(Router)
Vue.use(VueAxios, axios)




Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL


export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  linkActiveClass: 'active bg-sidemenuActiveColor',
  routes: [
    { path: '*', redirect: '/login'},
    { name: 'Login', path: '/login', component: Login, meta: { auth: false } },
    {
      path: '/',
      name: 'Dashboard',
      redirect: '/users/all',
      component: Dashboard,
      meta: { auth: true },
      children: [
        { name: 'Home', path: '/home', component: Home },
        { name: 'Users', path: '/users/:status', component: Users },
        { name: 'User Details', path: '/users-details/:id', component: UserDetails },
        { name: 'Settings', path: '/settings', component: Settings },
        { name: 'Email Template', path: '/settings/email-template', component: EmailTemplate },
        { name: 'Fee', path: '/settings/fee', component: Fee },
        { name: 'User Management', path: '/settings/user-management', component: UserManagement },
        { name: 'Salary', path: '/settings/salary', component: Salary },
        { name: 'Promotions', path: '/promotions', component: Promotions },
        { name: 'Merchants', path: '/merchants', component: Merchants },
        { name: 'Messages', path: '/messages', component: Messages },

        { name: 'Change Limit', path: '/change-limit/:status', component: ChangeLimit },
        { name: 'User Limit Details', path: '/limit-details/:id', component: UserLimitDetails },
      ]
    },
    
  ]
})
