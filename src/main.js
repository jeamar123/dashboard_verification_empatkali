import Vue from 'vue'

// Bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Custom CSS
require('./assets/styles.scss')

import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMoment from 'vue-moment'
import VueSweetalert2 from 'vue-sweetalert2'

// Font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSignInAlt,
  faStore,
  faHandshake,
  faBullhorn,
  faUserFriends,
  faSearch,
  faUserSlash,
  faPlusSquare,
  faCog,
  faEnvelope,
  faCoins,
  faEdit
} from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(
  faSignInAlt,
  faUser,
  faStore,
  faHandshake,
  faBullhorn,
  faUserFriends,
  faSearch,
  faUserSlash,
  faPlusSquare,
  faCog,
  faEnvelope,
  faCoins,
  faEdit
  )
Vue.component('font-awesome-icon', FontAwesomeIcon)

import VeeValidate from 'vee-validate';
// Filters
import './filters/index'


import App from './App.vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(VueMoment)
Vue.use(VueSweetalert2)
Vue.use(VeeValidate)

Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'

import Transaction from './components/Transaction.vue'
import ApprovePromo from './components/ApprovePromo.vue'
import AddMerchantUser from './components/AddMerchantUser.vue'
import AllPromotion from './components/AllPromotion.vue'
import AddCategory from './components/AddCategory.vue'
import AssignCategory from './components/AssignCategory.vue'

// User
import User from './components/users/Index.vue'
import ActiveUser from './components/users/ActiveUser.vue'
import PendingUser from './components/users/PendingUser.vue'
Vue.component('active-user', ActiveUser)
Vue.component('pending-user', PendingUser)

// Merchants
import Merchant from './components/merchants/Index.vue'

// Promotions
import Promotion from './components/promotions/Index.vue'

// Help Desk
import HelpDesk from './components/helpdesk/Index.vue'

// Settings
import Settings from './components/settings/__Main.vue'
import SettingsIndex from './components/settings/Index.vue'
import SettingsEmailTemplate from './components/settings/EmailTemplate.vue'
import SettingsFee from './components/settings/Fee.vue'
import SettingsUserManagement from './components/settings/UserManagement.vue'

const routes = [
  { path: '*', redirect: '/login' },
  { path: '/login', component: Login, meta: { auth: false } },
  {
    path: '/',
    component: Dashboard,
    redirect: '/users',
    name: 'dashboard',
    meta: { auth: true },
    children: [
      { path: '/merchants', component: Merchant, name: 'merchant' },
      { path: '/users', component: User },
      { path: '/transactions', component: Transaction },
      { path: '/approvepromo', component: ApprovePromo },
      { path: '/addmerchantuser', component: AddMerchantUser },
      { path: '/allpromotion', component: AllPromotion },
      { path: '/addcategory', component: AddCategory },
      { path: '/assigncategory', component: AssignCategory },

      { path: '/promotions', component: Promotion, name: 'promotion' },
      { path: '/help-desk', component: HelpDesk, name: 'helpdesk' },

      // Settings
      {
        path: '/settings/', component: Settings, name: 'settings', redirect: '/settings/',
        children: [
          { path: '/', component: SettingsIndex, name: 'settings-index' },
          { path: 'email-template', component: SettingsEmailTemplate, name: 'settings-email-template' },
          { path: 'fee', component: SettingsFee, name: 'settings-fee' },
          { path: 'user-management', component: SettingsUserManagement, name: 'settings-user-management' },
        ],
      },
    ],
  },
]

const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  routes,
})

Vue.router = router

Vue.use(require('@websanova/vue-auth'), {
  auth: {
    request(req, token) {
      this.options.http._setHeaders.call(this, req, {
        Authorization: `Bearer ${token}`,
      })
    },
    response(res) {
      var token = res.data.token
      if (token) {
        token = token.split(/Bearer\:?\s?/i)
        return token[token.length > 1 ? 1 : 0].trim()
      }
    },
  },
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: {
    url: `${process.env.VUE_APP_API_URL}/api/auth/login`,
    method: 'POST',
    redirect: '/login',
  },
  authRedirect: { path: `${process.env.VUE_APP_API_URL}/api/auth/login` },
  tokenDefaultName: 'auth_token',
  refreshData: { enabled: false },
  fetchData: { enabled: false },
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
