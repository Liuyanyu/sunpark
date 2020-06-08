<template>
    <div>
      <div class="banner image is-3by1" v-if="bannerUrl">
            <img v-lazy="bannerUrl" alt="公园介绍">
        </div>
        <div class="main">
            <div class="container">
                <div class="pad-top-40 pad-bottom-60">
                    <div class="page-header">
                        <h2 class="page-title font-400 pad-bottom-40">联系我们
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
import { formatText, prefixUrl} from "@/utils/filters";
export default {
  data() {
    return {
      intro: '',
      bannerUrl: ""
    };
  },
  created() {
    this.getContact();
  },
  methods: {
    getContact() {
      api.getContactCn().then(res => {
                const { code, object, msg } = res.data
                if (code == 0) {
                    this.intro = (object.webOursContactCnInfo.contactContent)
                    if(object.bgImg && object.bgImg.bgImg){
                        this.bannerUrl = prefixUrl(object.bgImg.bgImg)
                    }
                } else {
                    this.intro = msg
                }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dl {
  &-list {
    & > dd {
      padding-bottom: 15px;
    }
  }
}
</style>