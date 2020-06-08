<template>
   <div class="">
      <div class="banner image is-3by1" v-if="bannerUrl">
            <img v-lazy="bannerUrl" alt="公园介绍">
      </div>
        <div class="main">
            <div class="container">
                <div class="nav-btns text-center pad-top-40 pad-bottom-40" id="btns">
                    <a class="button" style="border-color: #ebebeb;background-color: #ebebeb;" target="_blank" href="http://presell.sun-park.com/">门票购买</a>
                    <a class="button" style="border-color: #ebebeb;background-color: #ebebeb;" target="_blank" href="http://presell.sun-park.com/">年月票续费</a>
                    <router-link class="button" :to="{path: '/booking/amusement#btns'}">游乐票预订</router-link>
                    <router-link class="button active" :to="{path: '/booking/site#btns'}">场地预订</router-link>
                    <router-link class="button" :to="{path: '/booking/other#btns'}">其它票务</router-link>
                </div>
                <div>
                  <a :href="item.siteLink || 'javascript:;'" :class="{'project':true, 'cursor-default': !item.siteLink}" v-for="(item, index) in list">
                      <div class="row">
                          <div class="col-4 project-title pad-left-10">
                              <div class="text-table">
                                  <div class="text-table-cell">
                                      {{item.siteName}}
                                      <small class="none block-l pad-top-20" v-html="item.siteIntro"></small>
                                  </div>
                              </div>
                          </div>
                          <div class="col-8 push-4">
                              <div class="project-img" :style="'background-image:url('+item.siteImg+')'"></div>
                          </div>
                      </div>
                  </a>
                  <infinite-loading @infinite="queryList">
                    <span slot="no-more">
                        没有更多了:)
                    </span>
                  </infinite-loading>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import api from "@/api";
import { prefixUrl, formatText } from "@/utils/filters";
import InfiniteLoading from "vue-infinite-loading";

export default {
  components: {
    InfiniteLoading
  },
  data() {
    return {
      list: [],
      pageNum: 1,
      bannerUrl: ""
    };
  },
  async mounted() {
    // this.queryList()
  },
  methods: {
    queryList($state) {
      api.queryBookingSite(this.pageNum, 1).then(res => {
        const { code, msg, object } = res.data;
        if (code != 0) {
          console.error(msg);
          $state.complete();
          return;
        }

        const newList = object.webBookingSiteList.map(item => {
          item.siteImg = prefixUrl(item.siteImg);
          item.siteIntro = formatText(item.siteIntro);
          return item;
        });
        if (object.bgImg && object.bgImg.bgImg) {
          this.bannerUrl = prefixUrl(object.bgImg.bgImg);
        }

        if (newList.length) {
          this.list = this.list.concat(newList);
          this.pageNum++;
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.project {
  &-img {
    padding-top: 45%;
    background-color: #ccc;
    background-position: center;
    background-size: 100% auto;
    transition: all 0.2s ease-in-out;
    &:hover {
      background-size: 110% auto;
    }
  }
}
@media screen and (max-width: 740px) {
  .project-title {
    font-size: 14px;
  }
}
</style>