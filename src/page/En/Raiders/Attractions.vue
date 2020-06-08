<template>
  <div>
    <div class="banner" :style="'max-height:' + slideHeight + 'px'">
      <img v-lazy="bannerUrl" style="width: 100%;" />
    </div>
    <div class="raiders-container">
      <div class="pos-wrap">
        <span
          v-for="(item, index) in pos"
          class="pos"
          :style="'left:' + item.left + ';top:' + item.top"
          >{{ item.name }}</span
        >
      </div>
    </div>
    <div class="main">
      <div class="container">
        <div class="nav-btns text-center pad-top-40 pad-bottom-40" id="btns">
          <router-link
            class="button"
            :to="{ path: '/en/raiders/openTime#btns' }"
            >TIME</router-link
          >
          <router-link
            class="button"
            :to="{ path: '/en/raiders/recommend#btns' }"
            >RECOMMEND</router-link
          >
          <router-link
            class="button active"
            :to="{ path: '/en/raiders/attractions#btns' }"
            >ATTRACTIONS</router-link
          >
          <router-link class="button" :to="{ path: '/en/raiders/traffic#btns' }"
            >TRAFFIC</router-link
          >
          <router-link class="button" :to="{ path: '/en/raiders/stalls#btns' }"
            >STALLS</router-link
          >
        </div>
        <ul class="imgtext-list row list-unstyled text-center">
          <li class="col-1-2 col-1-4-m" v-for="(item, index) in gallerys">
            <div>
              <div class="transition img-transition image is-4by3">
                <img
                  @click="openGallery(item.id, index)"
                  v-lazy="item.src"
                  :alt="item.title"
                  class="img-fluid"
                />
              </div>

              <p class="pad-top-10 text-nowrap">{{ item.title }}</p>
            </div>
          </li>
        </ul>
        <lightbox
          :title="gallery.title"
          :desc="gallery.desc"
          :images="gallery.images"
          ref="lightbox"
          :siteLoading="loadingImg"
          :nThumbs="nThumbs"
        ></lightbox>
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
      gallerys: null,
      loadingImg: require("@assets/loading.gif"),
      pos: [],
      bannerUrl: ""
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
          title: item.scenicNameEn,
          src: prefixUrl(item.scenicImg),
          desc: item.scenicContentEn
        }));
        console.log(res);
      });
    },
    openGallery(id, index) {
      api.getScenic(id).then(res => {
        const { code, msg, object } = res.data;
        if (code !== "00") {
          console.error(msg);
          return false;
        }

        const { desc, title } = this.gallerys[index];
        const images = object.webRaidersScenicPhotoList.map(item => ({
          src: prefixUrl(item.photoImg),
          thumb: prefixUrl(item.photoImg)
        }));

        if (!images || !images.length) {
          return false;
        }
        this.gallery = {
          images,
          desc,
          title
        };
        this.$refs.lightbox.showImage(0);
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
</style>
