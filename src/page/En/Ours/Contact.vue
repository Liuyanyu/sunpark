<template>
    <div>
        <div class="banner">
            <img v-lazy="bannerUrl" alt="CONTACT US">
        </div>
        
        <div class="main">
            <div class="container">
                <div class="pad-top-40 pad-bottom-60">
                  <div class="page-header">
                    <h2 class="page-title font-400 pad-bottom-10">CONTACT US
                    </h2>
                  </div>
                  <div class="pad-top-40">
                      <dl class="dl-list">
                          <template v-for="(item, index) in contacts">
                              <dt class="col-1">
                                  <i class="icon-dt"></i>
                              </dt>
                    
                              <dd class="fs-4" v-html="item.contentEn"></dd>
                          </template>
                      </dl>
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
      contacts: [],
      bannerUrl: ""
    };
  },
  created() {
    this.getContact();
  },
  methods: {
    getContact() {
      api.getContact().then(res => {
        const { code, msg, object } = res.data;
        if (code == 0) {
          this.contacts = object.webOursContactList.map(item => {
            item.content = formatText(item.content);
            return item;
          });
          if (object.bgImg && object.bgImg.bgImg) {
            this.bannerUrl = prefixUrl(object.bgImg.bgImgEn);
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