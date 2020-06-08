<template>
  <div>
    <div class="banner container">
      <img v-lazy="bannerUrl" />
    </div>

    <div class="main">
      <div class="container">
        <div class="pad-top-40 pad-bottom-60">
          <div class="page-header">
            <h2 class="page-title font-400 pad-bottom-10">LOCATION</h2>
          </div>
          <dl class="dl-list pad-top-40">
            <template v-for="(item, index) in locations">
              <dt class="col-1">
                <i class="icon-dt"></i>
              </dt>
              <dd>
                <p class="fs-4">{{ item.locationNameEn }}</p>
                <p v-html="item.locationContentEn"></p>
              </dd>
            </template>
          </dl>
        </div>
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
      locations: [],
      bannerUrl: ""
    };
  },
  methods: {
    query() {
      api.getLocations().then(res => {
        const { code, msg, object } = res.data;
        if (code != 0) {
          console.error(msg);
          return false;
        }

        this.locations = object.webServiceLocationList.map(item => {
          item.locationContent = formatText(item.locationContent);
          if (object.bgImg && object.bgImg.bgImg) {
            this.bannerUrl = prefixUrl(object.bgImg.bgImgEn);
          }
          return item;
        });
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
