<template>
    <div>
        <div class="banner image is-3by1" v-if="bannerUrl">
            <img v-lazy="bannerUrl" />
        </div>
        <div class="main">
            <div class="container">
                <div class="pad-top-40 pad-bottom-60">
                    <div class="page-header">
                        <div class="row">
                            <div class="col-1-3-l text-center push-1-3-l">
                                <h2 class="page-title font-400 pad-bottom-40">新闻公告
                                </h2>
                            </div>
                            <div class="col-1-3-l pull-1-3-l pad-bottom-10">
                                <v-select :options="dateOptions" class="page-header-select" placeholder="更多资讯" @change="selectMonth" :value="dateVal"></v-select>
                            </div>
                        </div>
                    </div>
                    <div class="imgtext-list list-unstyled">
                        <div class="row-m imgtext-item" v-for="(item, index) in list">
                            <div class="col-3-m pad-bottom-10">
                                <router-link :to="'/ours/news/' + item.newsId" class="img-transition image is-16by9">
                                    <img v-lazy="item.newsLogo" class="img-fluid" :alt="item.newsName">
                                </router-link>
                            </div>
                            <div class="col-9-m">
                                <h4 class="pad-bottom-20">
                                    <router-link :to="'/ours/news/' + item.newsId">{{item.newsName}}</router-link>
                                </h4>
                                <p class="text-overflow line-3">{{item.newsIntro | newsText}}</p>
                                <p class="date pad-top-20">{{item.newsDate}}</p>
                            </div>
                        </div>
                        <div class="load-btn" @click="loadMore" v-if="list.length>4 && !noMore">加载更多</div>
                        <div class="no-more" v-if="noMore">没有更多了:)</div>
                        <!-- <infinite-loading ref="infiniteLoading" @infinite="queryList">
                            <span slot="no-more">
                                没有更多了:)
                            </span>
                            <no-result slot="no-results"></no-result>
                        </infinite-loading> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { prefixUrl, todu } from "@/utils/filters";
import Select from "@/components/Select";
import NoResult from "@/components/NoResult";
import InfiniteLoading from "vue-infinite-loading";
import api from "@/api";

export default {
  components: {
    VSelect: Select,
    InfiniteLoading,
    NoResult
  },
  data() {
    return {
      list: [],
      pageNum: 1,
      dateVal: "-",
      bannerUrl: '',
      noMore: false
    };
  },
  methods: {
    queryList() {
      const [selectYear, selectMonth] = this.dateVal.split("-");
      api.queryNews(this.pageNum, selectYear, selectMonth).then(res => {
        const { msg, code, object } = res.data;
        if (code != 0) {
          console.error(msg);
          return;
        }
        // console.log(prefixUrl)
        const newList = object.webOursNewList.map(item => {
          item.newsLogo = prefixUrl(item.newsLogo);
          if (object.bgImg && object.bgImg.bgImg) {
              this.bannerUrl = prefixUrl(object.bgImg.bgImg)
          }
          return item;
        });

        if (newList.length) {
          this.list = this.list.concat(newList);
          // this.pageNum++;
        }else{
          this.noMore = true
        }
      });
    },
    selectMonth(val) {
      this.dateVal = val;
      this.pageNum = 1;
      this.list = [];
      // this.$nextTick(() => {
      //   this.$refs.infiniteLoading.$emit("$InfiniteLoading:reset");
      // });
      this.queryList()
    },
    loadMore(){
      this.pageNum++
      this.queryList()
    }
  },
  filters: {
    newsText(text) {
      return text.length > 240 ? text.substr(0, 240) + "..." : text;
    },
    prefixUrl
  },
  async mounted() {
    this.queryList()
  },
  computed: {
    dateOptions() {
      const month = 24;
      let result = [];
      let dateObj = new Date();
      dateObj.setMonth(dateObj.getMonth() - month + 1);
      for (let i = 0; i < month; i++) {
        const curYear = dateObj.getFullYear();
        const curMonth = dateObj.getMonth() + 1;
        result.push({
          label: curYear + "年" + curMonth + "月",
          value: curYear + "-" + todu(curMonth)
        });
        dateObj.setMonth(curMonth);
      }
      result.push({
        label: "全部",
        value: "-"
      });

      return result.reverse();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/sass/base/_mixins";

.load-btn{
  padding: 10px 0;
  width: 100%;
  text-align: center;
  border: 1px solid #eee;
  width: 300px;
  // background-color: #333;
  // color: #eee;
  margin: 10px auto;
  border-radius: 20px;
  cursor: pointer;
}

.imgtext {
  &-list {
    min-height: 300px;
    // overflow: hidden;
  }
  &-item {
    padding: 40px 0;
    border-bottom: 1px solid #eee;
    & > .col-3 {
      padding-left: 0;
    }
    p {
      height: 60px;
      margin: 0;
    }
    @include breakpoint(m) {
      padding: 50px 0;
      .date {
        padding-top: 20px;
      }
    }
  }
}
@media screen and (max-width: 740px){
  .imgtext-item p[data-v-3e92f02d] {
      height: 60px;
      margin: 0;
      text-overflow: ellipsis;
      overflow: hidden;
  }
}

</style>