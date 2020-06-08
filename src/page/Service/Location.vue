<template>
  <div>
    <div class="banner image is-3by1" v-if="bannerUrl">
      <img v-lazy="bannerUrl" style="width: 100%;" />
    </div>

    <div class="main pad-top-40">
      <div class="container">
        <div class="page-header">
          <h2 class="page-title font-400 pad-bottom-40">交通指南</h2>
        </div>
        <dl class="dl-list pad-top-40">
          <template>
            <p v-html="webServiceLocationCnInfo.locationContent"></p>
          </template>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { formatText, prefixUrl } from "@/utils/filters";
import api from "@/api";

export default {
  data() {
    return {
      webServiceLocationCnInfo: {
        locationContent: null
      },
      bannerUrl: ""
    };
  },
  methods: {
    query() {
      api.getLocationCn().then(res => {
        const { code, msg, object } = res.data;
        if (code != 0) {
          console.error(msg);
          return false;
        }
        if (object.bgImg && object.bgImg.bgImg) {
          this.bannerUrl = prefixUrl(object.bgImg.bgImg);
        }

        this.webServiceLocationCnInfo = object.webServiceLocationCnInfo;
      });
    }
  },
  async mounted() {
    // console.log(this.filters)
    this.query();
  }
};
</script>

<style scoped lang="scss">
// .banner {
//     &-section {
//         height: 800px;
//         background: #333 url(/src/assets/banner.png) no-repeat;
//         background-size: cover;
//         position: relative;
//     }
// }
</style>
