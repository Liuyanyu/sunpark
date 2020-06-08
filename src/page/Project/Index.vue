<template>
  <div>
    <div
      class="banner-section"
      :style="'height:' + slideHeight + 'px'"
      v-if="slides.length == 1"
    ></div>
    <slider
      class="slider"
      :arrows="true"
      :infinite="true"
      :autoplay="true"
      v-if="slideHeight && slides && slides.length > 1"
    >
      <div
        class="slide"
        v-for="(item, index) in slides"
        :style="
          'background-image:url(' + item.url + ');height:' + slideHeight + 'px'
        "
      ></div>
    </slider>
    <div class="pad-top-60 pad-bottom-60">
      <div class="container">
        <div class="text-center">
          <h2 class="pad-bottom-15">{{ title }}</h2>
          <more-text class="lead" max-length="200" :text="intro"></more-text>
          <div>
            <span class="btns">
              <button class="button button-primary" :disabled="!reserveLink">
                立即预订
              </button>
              <button
                :disabled="!timeTable"
                class="button button-secondary"
                @click="$modal.show('timeTable')"
              >
                活动时间表
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="pad-top-60 pad-bottom-60 bg-gray">
      <div class="container">
        <div class="text-center">
          <h2 class="pad-bottom-15">活动详情</h2>
          <more-text class="lead" max-length="300" :text="content"></more-text>
        </div>
      </div>
    </div>
    <div class="pad-top-60 pad-bottom-60 text-center">
      <div class="container">
        <div class="row time-list" v-if="timeList && timeList.length">
          <div class="col-1-3-l" v-for="(item, index) in timeList">
            <div class="time-item" :class="{ middle: index == 1 }">
              <h3>{{ item.yearName }}</h3>
              <div class="text-table">
                <ul
                  class="childrden text-table-cell list-unstyled"
                  v-if="
                    item.webThemeActivityList &&
                      item.webThemeActivityList.length
                  "
                >
                  <li
                    v-for="a in item.webThemeActivityList"
                    :class="{ active: a.activityId == projectId }"
                  >
                    <a
                      target="_black"
                      @click="openNewProject(a.activityId)"
                      href="javascript:;"
                      >{{ a.activityName }}</a
                    >
                  </li>
                </ul>
                <p class="text-table-cell" v-else>暂无数据</p>
              </div>
            </div>
          </div>
        </div>
        <no-result v-else />
      </div>
    </div>
    <div class="pad-top-60 pad-bottom-60 photo-list">
      <div class="container">
        <h2 class="pad-bottom-15">精彩时刻</h2>
        <div class="row" v-if="moments">
          <div
            class="col-1-2-l"
            style="padding:15px 30px;"
            v-for="(item, index) in moments"
          >
            <div class="photo">
              <div class="news-img image is-16by9">
                <img class="img-fluid" v-lazy="item.momentImg" alt="" />
              </div>
              <div class="pad-top-20 pad-bottom-20 fs-4">
                {{ item.momentName }}
              </div>
              <!-- <p class="pad-top-20 photo-text">{{item.momentContent}}</p> -->
              <more-text
                class="pad-top-20 photo-text"
                btn-align="right"
                max-length="200"
                :text="item.momentContent"
              ></more-text>
            </div>
          </div>
        </div>
        <no-result v-else></no-result>
      </div>
    </div>
    <div class="pad-top-60 pad-bottom-60 bg-gray">
      <div class="container">
        <h2 class="pad-bottom-15">活动动态</h2>
        <ul class="list-unstyled news-list" v-if="news && news.length">
          <li v-for="(item, index) in news">
            <span class="news-date pull-right">{{ item.newsDate }}</span
            ><a
              href="javascript:;"
              @click="openLink('#/project/news/' + item.newsId)"
              >{{ item.newsName }}</a
            >
          </li>
        </ul>
        <no-result v-else></no-result>
      </div>
    </div>
    <modal height="auto" :scrollable="true" name="timeTable">
      <img :src="timeTable" alt="活动时间表" />
    </modal>
  </div>
</template>

<script>
import api from "@/api";
import NoResult from "@/components/NoResult";
import MoreText from "@/components/MoreText";
import Agile from "@/components/Agile";
import { mapActions, mapGetters } from "vuex";
import { prefixUrl, openLink } from "@/utils/filters";

export default {
  components: {
    NoResult,
    MoreText,
    Slider: Agile
  },
  data() {
    return {
      title: "",
      news: [],
      moments: [],
      intro: "",
      content: "",
      banners: [],
      timeTable: "",
      reserveLink: "",
      slides: [],
      timeList: [],
      projectId: ""
    };
  },
  methods: {
    getProject(id) {
      api.getThemeProject(id).then(res => {
        const { code, msg, object } = res.data;
        if (code !== "00") {
          console.error(msg);
          return false;
        }

        // this.data = object.webThemeActivityInfo.
        let data = object.webThemeActivityInfo;
        this.moments = data.activityMoments.map(item => {
          item.momentImg = prefixUrl(item.momentImg);
          return item;
        });
        this.title = data.activityName;
        this.intro = data.activityIntro;
        this.content = data.activityContent;
        this.banners = data.activityBanners;
        this.news = data.activityNews;
        this.reserveLink = data.reserveLink;
        if (data.activityTimeTable) {
          this.timeTable = prefixUrl(data.activityTimeTable);
        }
        if (data.activityBanners) {
          this.slides = data.activityBanners.map(item => ({
            url: prefixUrl(item.bannerImg)
          }));
        }
        this.timeList = object.webThemeActivityList
          .slice(0, 3)
          .sort((a, b) => a.yearName - b.yearName);
      });
    },
    openNewProject(id) {
      window.open("/#/project/" + id);
    },
    openLink
  },
  async mounted() {
    const { id } = this.$route.params || {};
    this.projectId = id;
    this.getProject(id);
  },
  computed: {
    ...mapGetters({
      device: "device"
    }),
    slideHeight() {
      return this.device.isMobile ? window.innerWidth : this.device.height - 62;
    }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  &-section {
    height: 600px;
    // background: #333 url(  @assets/projectIndex.png) center no-repeat;
    background-size: auto 100%;
    position: relative;
  }
}
.btns {
  display: inline-block;
  .button {
    color: #fff;
    width: 160px;
    border: none;
  }
}
.button {
  &-primary {
    background: #c00;
    margin-right: 10px;
  }
  &-secondary {
    background: #333;
    // margin-left: 5px;
  }
}

.photo {
  &-list {
    .row {
      margin: 0 -30px;
    }
    [class*="col-1-2"] {
      padding: 0 30px;
    }
  }
  &-text {
    line-height: 1.8;
    padding: 5px 0 20px 0;
  }
}
.news {
  &-list {
    & > li {
      line-height: 2;
      padding-bottom: 5px;
    }
  }
}
.time {
  &-list {
    // margin: 0 -20px;
  }
  &-item {
    &.middle {
      margin: 0 -10px;
      & > .text-table {
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
    }
    & > h3 {
      padding-bottom: 30px;
    }
    & > .text-table {
      padding: 10px 20px;
      height: 180px;
    }
  }
}
.slider {
  background-color: #333;
}
.slide {
  background-position: 50%;
  background-repeat: no-repeat;
}

.time {
  &-item {
    .childrden {
      & > li {
        padding: 5px 0;
        &.active > a {
          color: #c00 !important;
        }
      }
    }
  }
}

.photo-text {
  border-top: 1px solid #888;
  border-bottom: 1px solid #888;
  padding: 20px 0;
}
</style>
