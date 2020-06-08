<template>
  <div>
    <div
      class="raiders-container banner"
      :style="'max-height:' + slideHeight + 'px'"
    >
      <img v-lazy="bannerUrl" style="width: 100%;" />
      <div class="pos-wrap">
        <!-- <span v-for="(item, index) in pos" class="pos" :style="'left:'+item.left+';top:'+item.top">{{item.name}}</span> -->
        <span
          v-for="(item, index) in pointers"
          class="pos"
          :style="
            'left:' + item.distanceLeft + '%;top:' + item.distanceTop + '%'
          "
          >{{ item.scenicName }}</span
        >
      </div>
    </div>
    <div class="main">
      <div class="container">
        <div class="nav-btns text-center pad-top-40 pad-bottom-40" id="btns">
          <router-link class="button" :to="{ path: '/raiders/openTime#btns' }"
            >开放时间</router-link
          >
          <router-link class="button" :to="{ path: '/raiders/recommend#btns' }"
            >游园路线</router-link
          >
          <router-link
            class="button active"
            :to="{ path: '/raiders/attractions#btns' }"
            >园区景点</router-link
          >
          <router-link class="button" :to="{ path: '/raiders/traffic#btns' }"
            >园内交通</router-link
          >
          <router-link class="button" :to="{ path: '/raiders/stalls#btns' }"
            >游园导览</router-link
          >
        </div>
        <ul class="imgtext-list row list-unstyled text-center">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in gallerys">
              <div class="transition img-transition image is-16by9">
                <img
                  @click="openGallery(item.id, index)"
                  v-lazy="item.src"
                  :alt="item.title"
                  class="img-fluid"
                />
              </div>
              <p class="pad-top-20 pad-bottom-20 text-nowrap">
                {{ item.title }}
              </p>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div
              class="swiper-button-prev swiper-button-white"
              style="top:37%"
              slot="button-prev"
            ></div>
            <div
              class="swiper-button-next swiper-button-white"
              style="top:37%"
              slot="button-next"
            ></div>
          </swiper>
        </ul>
        <div
          style="background:#f9f9f9;text-align: center;margin-bottom: 50px;"
          class="photo-list imgtext-list"
        >
          <swiper :options="swiperOption1">
            <swiper-slide v-for="(item, index) in photos">
              <div class="container pad-top-30">
                <h2>{{ item.title }}</h2>
                <p style="margin: 2% 15% 5% 15%;">{{ item.desc }}</p>
              </div>
              <div class="image is-16by9">
                <img v-lazy="item.src" :alt="item.src" class="img-fluid" />
              </div>
            </swiper-slide>
            <div
              class="swiper-pagination swiper-pagination-white"
              slot="pagination"
            ></div>
            <div
              class="swiper-button-prev swiper-button-white"
              style="top:60%"
              slot="button-prev"
            ></div>
            <div
              class="swiper-button-next swiper-button-white"
              style="top:60%"
              slot="button-next"
            ></div>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lightbox from "@/components/Lightbox";
import { mapActions, mapGetters } from "vuex";
import { prefixUrl } from "@/utils/filters";
import api from "@/api";
// import loadingImg from '@assets/siteloading.gif'

export default {
  components: {
    Lightbox
  },
  data() {
    return {
      galleryIndex: 0,
      gallery: {
        title: "",
        desc: "",
        images: []
      },
      btns: [],
      gallerys: null,
      loadingImg: require("@assets/loading.gif"),
      pointers: [],
      photos: null,
      bannerUrl: "",
      swiperOption: {
        autoplay: true,
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperOption1: {
        spaceBetween: 30,
        effect: "fade",
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  methods: {
    // openGallery(id, index) {
    //     console.log(index)
    //     // console.log(this.gallery)
    //     // this.galleryIndex = index
    //     // this.$refs.lightbox.showImage()
    // },
    queryScenic() {
      api.queryScenic().then(res => {
        const { code, msg, object } = res.data;
        if (code !== "00") {
          console.error(msg);
          return false;
        }

        // gallerys
        this.gallerys = object.webRaidersScenicList.map(item => ({
          id: item.scenicId,
          title: item.scenicName,
          src: prefixUrl(item.scenicImg),
          desc: item.scenicContent
        }));
        this.pointers = object.webRaidersScenicList;
        console.log("pointers>>>>>" + this.pointers[0].scenicId);
        this.openGallery(this.pointers[0].scenicId, 0);
      });
    },
    openGallery(id, index) {
      api.getScenic(id).then(res => {
        const { code, msg, object } = res.data;
        if (code !== "00") {
          console.error(msg);
          return false;
        }

        //const {desc, title} = this.gallerys[index]
        this.photos = object.webRaidersScenicPhotoList.map(item => ({
          src: prefixUrl(item.photoImg),
          title: item.photoName,
          desc: item.photoContent
          // title:this.gallerys[index].title,
          // desc:this.gallerys[index].desc,
        }));
      });
    },
    getRaidersBanner() {
      api.getRaidersBanner().then(res => {
        const { code, msg, object } = res.data;
        if (code != 0) {
          console.error(msg);
          return;
        }

        this.bannerUrl = prefixUrl(object.webRaidersBannerInfo.bannerImg);
        console.log(object);
      });
    }
  },
  computed: {
    ...mapGetters({
      device: "device"
    }),
    nThumbs() {
      return this.device.isMobile ? 3 : 6;
    },
    slideHeight() {
      return this.device.isMobile ? 360 : this.device.height - 62;
    }
  },
  async mounted() {
    this.queryScenic();
    this.getRaidersBanner();
  }
};
</script>

<style lang="scss" scoped>
.imgtext-list {
  margin-left: -10px;
  margin-right: -10px;
  [class^="col"] {
    padding: 10px;
  }
  img {
    width: 100%;
  }
}
.photo-list .swiper-slide .container {
  display: none;
}
.photo-list .swiper-slide .image {
  display: none;
}
.photo-list .swiper-slide-active .container {
  display: block;
}
.photo-list .swiper-slide-active .image {
  display: block;
}
</style>
