<template>
    <div>
         <slider class="slider container" :arrows="true" :infinite="true" :autoplay="false" v-if="slideHeight && slides.length">
			<div class="slide" @click="openLink(item.link)" v-for="(item, index) in slides" ____style="'background-image:url('+item.url+');height:'+slideHeight+'px'">
				<img :src="item.url" alt="" width="100%">
			</div>
		</slider>
        <div class="summary-section">
			<div class="container">
				<div class="clear summary-list text-center">
					<div class="row">
                        <div class="pad-top-10 col-1-3">
						<router-link to="/en/raiders" class="icon block">
							<i class="block iconfont icon-icon_"></i>
							<span class="block">STRATEGY</span>
						</router-link>
					</div>
					<div class="pad-top-10 col-1-3">
						<router-link to="/en/service" class="icon block">
							<i class="block iconfont icon-icon_1"></i>
							<span class="block">GUEST SERVICES</span>
						</router-link>
					</div>
					<div class="pad-top-10 col-1-3">
						<router-link to="/en/ours" class="icon block">
							<i class="block iconfont icon-icon_3"></i>
							<span class="block">ABOUT US</span>
						</router-link>
					</div>
                    </div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import api from "@/api";
import Agile from "@/components/Agile";
import { mapActions, mapGetters } from "vuex";
import { prefixUrl, openLink } from "@/utils/filters";

export default {
//   name: "home",
  data() {
    return {
      slides: []
    };
  },
  components: {
    Slider: Agile
  },
  computed: {
    ...mapGetters({
      device: "device"
    }),
    slideHeight() {
      return this.device.isMobile
        ? window.innerWidth
        : this.device.height - 300;
    }
  },
  async mounted() {
    this.queryBanner();
  },
  methods: {
    queryBanner() {
      api.queryBanner(2).then(res => {
        const { code, msg, object } = res.data;
        if (code != 0) {
          console.error(msg);
          return;
        }

        console.log(object);
        this.slides = object.webHomeBannerList.map(item => ({
          url: prefixUrl(item.bannerImg),
          link: item.bannerLink
        }));
      });
    },
    openLink
  }
};
</script>

<style scoped lang="scss">
@import "~@/sass/base/_mixins";

$primay: #168c74;

.body {
  // min-height: none !important
}

.slide {
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
}

.summary {
  &-section {
    box-shadow: 0 5px 10px rgba(10, 10, 10, 0.05);
    margin-bottom: 10px;
  }
  &-list {
    padding: 0 10%;
    // padding: 10px 0 0;
    // @include breakpoint(m){
    // 	padding: 20px 0 0
    // }
    .icon {
      // margin-top: 6px;
      // font-size: 16px;
      // height: 130px;

      @include m() {
        height: 65px;
        font-size: 12px;
      }
      & > span {
        padding-bottom: 20px;
        margin: 0 20%;
        border-bottom: 4px solid #fff;
        // padding-top: 5px;
        // @include breakpoint(m){
        // 	padding-top: 20px;
        // }
      }
      &:hover {
        & > span {
          border-bottom-color: $primay;
        }
        &.iconfont {
          color: $primay;
        }
      }
    }
    .iconfont {
      // transition 0.2s color 0.2s;
      font-size: 46px;
      height: 60px;
      width: 60px;
      // text-align:
      display: inline-block;
      line-height: 60px;
      position: relative;

      @include m() {
        line-height: 40px;
        font-size: 22px;
        height: 40px;
        width: 40px;
      }
    }
  }
}
</style>