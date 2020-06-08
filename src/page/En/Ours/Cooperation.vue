<template>
    <div>
        <div class="banner">
            <img v-lazy="bannerUrl" alt="TALENT RECRUITMENT">
        </div>
        <div class="main">
            <div class="container">
                <div class="pad-top-40 pad-bottom-60">
        <div class="page-header">
            <h2 class="page-title font-400 pad-bottom-10">TALENT RECRUITMENT
            </h2>
        </div>
        <div class="pad-top-40">
            <div class="row cooper-row" v-if="cooperations">
                <div class="col-1-3-l cooper-col" v-for="(item, index) in cooperations" :class="{'middle': index%3===1}">
                    <div class="cooper">
                        <h3 class="cooper-title"><i class="icon-dt"></i>{{item.cooperationNameEn}}</h3>
                        <div class="pad-bottom-10" v-if="item.cooperationImg">
                            <div class="image is-16by9">
                                <img v-lazy="item.cooperationImg" :alt="item.cooperationNameEn" class="img-fluid">
                            </div>
                        </div>
                        <p class="text-overflow cooper-desc" v-html="item.cooperationContentEn"></p>
                    </div>
                </div>
            </div>
            <spinner v-else></spinner>
        </div>
    </div>
            </div></div></div>
</template>

<script>
import api from "@/api";
import Spinner from "vue-simple-spinner";
import { prefixUrl } from "@/utils/filters";

export default {
  components: {
    Spinner
  },
  data() {
    return {
      cooperations: null,
      bannerUrl: ''
    };
  },
  methods: {
    queryCooperations() {
      api.queryCooperations().then(res => {
        const { code, object, msg } = res.data;
        if (code != 0) {
          console.error(msg);
          return false;
        }

        this.cooperations = object.WebOursCooperationList.map(item => {
          if (item.cooperationImg) {
            item.cooperationImg = prefixUrl(item.cooperationImg);
          }
          return item;
        });

        if (object.bgImg && object.bgImg.bgImg) {
          this.bannerUrl = prefixUrl(object.bgImg.bgImgEn);
        }
      });
    }
  },
  async mounted() {
    console.log(this.$options.filters);
    this.queryCooperations();
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
    padding-left: 30px;
    padding-bottom: 10px;
    position: relative;
    white-space:nowrap; 
    & > .icon-dt {
      position: absolute;
      left: 0;
      top: 10px;
    }
  }
  &-desc {
    height: 200px;
    -webkit-line-clamp: 10;
    margin-bottom: 0;
  }
}
</style>