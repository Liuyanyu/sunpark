<template>
  <div id="app">
    <template v-if="!isEnglish">
      <page-header :navs="navs" />
      <router-view class="body" />
      <page-footer />
    </template>
    <router-view class="en" v-else />
    <scroll-top />
    <notifications group="alert" />
    <nprogress-container />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { data as navs } from "@/data/nav";
import NprogressContainer from "vue-nprogress/src/NprogressContainer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import ScrollTop from "@/components/ScrollTop";

navs.forEach(item => {
  item.open = false;
});

export default {
  name: "app",
  data() {
    return {
      navs
    };
  },
  components: {
    pageHeader: Header,
    pageFooter: Footer,
    ScrollTop,
    NprogressContainer
  },
  beforeMount() {
    const { body } = document;
    const WIDTH = 740;
    const RATIO = 3;
    const handler = () => {
      if (!document.hidden) {
        let rect = body.getBoundingClientRect();
        let isMobile = rect.width - RATIO < WIDTH;
        this.toggleDevice({
          isMobile,
          height: window.innerHeight,
          width: window.innerWidth
        });
        this.toggleMenu(!isMobile);
      }
    };
    document.addEventListener("visibilitychange", handler);
    window.addEventListener("DOMContentLoaded", handler);
    window.addEventListener("resize", handler);
  },
  computed: {
    ...mapGetters({
      device: "device",
      menu: "menu",
      isEnglish: "isEnglish"
    })
  },
  methods: {
    ...mapActions(["toggleDevice", "toggleMenu"])
  },
  watch: {
    $route(to) {
      const top = 0;
      if (to.hash) {
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        console.log(scrollTop);
      } else {
        window.scrollTo(0, top);
        // document.body.scrollTop = 0
      }
    }
  }
};
</script>

<style lang="sass">
@import 'sass/_base.scss';
@import 'sass/_styles.scss';
@import 'sass/base/_helpers';
</style>
