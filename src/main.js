import Vue from 'vue';
import VCalendar from 'v-calendar';
import VueSweetalert2 from 'vue-sweetalert2';
import VueMoment from 'vue-moment';
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
// import $ from 'jquery'; 
// Viewer
import Viewer from 'v-viewer'
import VueModal from '@kouts/vue-modal';
import VeeValidate from 'vee-validate';
import * as VueGoogleMaps from 'vue2-google-maps'
import './filters/index'



/*  
  *
  * FontAwesome Library
  *
*/
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faHome,
  faTimes,
  faCheck,
  faUserFriends,
  faEnvelope,
  faCoins,
  faAngleRight,
  faPlusSquare,
  faEdit,
  faTrashAlt,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { 
  faTwitter,
  faLinkedin,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(
  faHome,
  faTwitter,
  faLinkedin,
  faFacebookSquare,
  faTimes,
  faCheck,
  faUserFriends,
  faEnvelope,
  faCoins,
  faAngleRight,
  faPlusSquare,
  faEdit,
  faTrashAlt,
  faPlus,
)
Vue.component('font-awesome-icon', FontAwesomeIcon)




import App from './App.vue';
import router from './router';



// import 'v-calendar/lib/v-calendar.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@kouts/vue-modal/dist/vue-modal.css';
import 'viewerjs/dist/viewer.css'
// import './assets/styles/index.css';




const options = {
  confirmButtonColor: '#0392CF',
  cancelButtonColor: '#FF5959',
};




Vue.use(VueLodash, { name: 'custom' , lodash: lodash })
Vue.use(VCalendar);
Vue.use(VueSweetalert2,options);
Vue.use(VueMoment);
Vue.use(Viewer)
Vue.use(VueModal)
Vue.component('Modal', VueModal);
Vue.use(VeeValidate)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCkjWXef2lDguLgq1Pk9cUkWQd3ReWXXaQ',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})


Vue.config.productionTip = false;

// const $ = require('jquery');
// window.$ = $; 

Vue.router = router;
// Vue.use(require('@websanova/vue-auth'), {
//   auth: {
//     request(req, token) {
//       this.options.http._setHeaders.call(this, req, {
//         Authorization: `Bearer ${token}`,
//       })
//     },
//     response(res) {
//       var token = res.data.token
//       if (token) {
//         token = token.split(/Bearer\:?\s?/i) //eslint-disable-line
//         return token[token.length > 1 ? 1 : 0].trim()
//       }
//     },
//   },
//   http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
//   router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
//   loginData: {
//     url: '/api/auth/login',
//     method: 'POST',
//     redirect: '/login',
//   },
//   authRedirect: { path: '/api/auth/login' },
//   tokenDefaultName: 'auth_token',
//   refreshData: { enabled: false },
//   fetchData: { enabled: false },
// })


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
