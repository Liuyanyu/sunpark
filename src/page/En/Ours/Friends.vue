<template>
    <div>
        <div class="banner">
            <img v-lazy="bannerUrl" alt="FRIENDSHIP LINK">
        </div>
        <div class="main">
            <div class="container">
                <div class="pad-top-40 pad-bottom-60">
        <div class="page-header">
            <h2 class="page-title font-400 pad-bottom-10">FRIENDSHIP LINK
            </h2>
        </div>
        <div class="pad-top-40">
            <dl class="dl-list">
                <template v-for="(item, index) in friends">
                    <dt class="col-1">
                        <i class="icon-dt"></i>
                    </dt>
                    <dd class="fs-4">
                        <a :href="item.link" target="_black">{{item.contentEn}}</a>
                    </dd>
                </template>
                <dd>
                    <p>Warm tip: the above website is not maintained in chaoyang park, and chaoyang park security statement does not apply to the above website. <br>
                     This link is only for the convenience of your visit and provide, chaoyang park, cannot guarantee the validity of this link, also not for you in this dynasty Yang park site access to any information or the authenticity of the contact way of.
                    </p>
                </dd>
            </dl>
        </div>
    </div>
            </div></div></div>
</template>

<script>
import api from "@/api";
import {prefixUrl} from '@/utils/filters';

export default {
  data() {
    return {
      friends: [],
      bannerUrl: ""
    };
  },
  created() {
    this.getFriend();
  },
  methods: {
    getFriend() {
      api.getFriend().then(res => {
        const { code, msg, object } = res.data;
        if (code == 0) {
          this.friends = object.webOursFriendList;
          if (object.bgImg && object.bgImg.bgImg) {
            this.bannerUrl = prefixUrl(object.bgImg.bgImg);
          }
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