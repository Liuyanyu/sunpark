// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import VueLazyload from "vue-lazyload";
import VueTouch from "vue-touch";
// import filters from './utils/filters'
import VueForm from "vue-form";
import VModal from "vue-js-modal";
import Notifications from "vue-notification";
import NProgress from "vue-nprogress";
import FastClick from "fastclick";
import VueAwesomeSwiper from "vue-awesome-swiper";

// require styles
import "swiper/dist/css/swiper.css";

Vue.config.productionTip = false;

Vue.router = router;

FastClick.attach(document.body);
Vue.use(NProgress);
Vue.use(Notifications);
Vue.use(VModal);
Vue.use(VueForm);
Vue.use(VueAwesomeSwiper);
Vue.use(VueTouch, { name: "v-touch" });
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "/src/assets/error.jpg",
  loading: "@assets/loading.gif",
  attempt: 1
});

const nprogress = new NProgress({ parent: ".nprogress-container" });

sync(store, router);

router.beforeEach((to, from, next) => {
  const isEnglish = /\/en\//.test(to.path);
  if (isEnglish !== store.state.app.isEnglish) {
    store.commit("SET_ENGLISH", isEnglish);
  }
  // document.body.scrollTop = 0
  next();
});

// router.beforeEach((to, from, next) => {
//   const scrollTop = to.query.s
//   if (scrollTop && scrollTop === 1) {
//     // const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
//     // document.body.scrollTop = scrollTop
//     next()
//   } else {
//     document.body.scrollTop = 0
//     next()
//   }
// })

// Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
/* eslint-disable no-new */
new Vue({
  // filters,
  el: "#app",
  router,
  store,
  nprogress,
  template: "<App/>",
  components: { App }
});
