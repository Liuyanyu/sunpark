<template>
    <div>
        <div class="banner image is-3by1" v-if="bannerUrl">
            <img v-lazy="bannerUrl" alt="公园介绍">
        </div>
        <div class="main">
            <div class="container">
                <div class="pad-top-40 pad-bottom-60">
                    <div class="page-header">
                        <h2 class="page-title font-400 pad-bottom-40">招商合作
                        </h2>
                    </div>
                    <div class="content pad-top-40" v-html="intro">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api";
import { formatText, prefixUrl } from "@/utils/filters";

export default {
  data() {
    return {
      intro: '',
      bannerUrl: ''
    };
  },
  methods: {
    getCooperation() {
      api.getCooperationCn().then(res => {
                const { code, object, msg } = res.data
                if (code == 0) {
                    this.intro = (object.webOursCooperationCnInfo.cooperationContent)
                    if(object.bgImg && object.bgImg.bgImg){
                        this.bannerUrl = prefixUrl(object.bgImg.bgImg)
                    }
                } else {
                    this.intro = msg
                }
      });
    }
  },
  async mounted() {
    this.getCooperation();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/sass/base/_mixins";

.cooper {
  // height: 410px;
  max－height: 410px;
  overflow: hidden;
  &-row {
    @include breakpoint(l) {
      margin: 0 -20px;
      & > .middle {
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
    }
  }
  &-col {
    padding: 10px 20px;
    margin-bottom: 40px;
  }
  &-title {
    // padding-left: 30px;
    // padding-bottom: 10px;
    // position: relative;
    // white-space:nowrap; 
    height: 60px;
    & > .icon-dt {
      left: 0;
      top: -5px;
    }
  }
  &-desc {
    height: 200px;
    -webkit-line-clamp: 10;
    margin-bottom: 0;
  }
}
</style>