<template>
  <router-view> </router-view>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~@/sass/base/_mixins";
.raiders {
  &-container {
    // height: 800px;
    // background: #333 url(/src/assets/banner.png) center no-repeat;
    // background-size: cover;
    // background-repeat: no-repeat;
    position: relative;
    @include m() {
      max-height: 400px;
    }

    .pos {
      &-wrap {
        // width: 960px;
        // position: relative;
        width: 100%;
        margin: 0 auto;
        // position: absolute;
      }
      position: absolute;
      padding: 0 12px;
      max-width: 160px;
      height: 22px;
      line-height: 22px;
      // overflow: hidden;
      // width: 80px;
      text-align: center;
      background: rgba(255, 255, 255, 0.8);
      font-size: 12px;
      border-radius: 12px;
      margin-left: -60px;
      margin-top: -46px;
      &::after,
      &::before {
        content: "";
        position: absolute;
      }
      &::after {
        right: 14px;
        top: 22px;
        width: 1px;
        height: 24px;
        background: rgba(255, 255, 255, 0.8);
      }
      &::before {
        right: 12px;
        top: 46px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }
}

.isFixed {
  position: fixed; // height: 50px;
  background: rgba(0, 0, 0, 0.58);
  left: 0;
  top: 0;
  width: 100%;
  &-btns {
    text-align: right;
    & > button {
      // display: inline;
      background: none;
      color: #cacaca;
      border: none;
      line-height: 50px;
      padding: 0 20px;
      height: 50px;
      &.active {
        color: #fff;
      }
      @include m() {
        font-size: 12px;
        line-height: 34px;
        height: 34px;
        padding: 0 10px;
      }
    }
  }
}

.mapbar {
  position: absolute; // height: 50px;
  background: rgba(0, 0, 0, 0.58);
  left: 0;
  top: 0px;
  width: 100%;
  &-btns {
    text-align: right;
    & > button {
      // display: inline;
      background: none;
      color: #cacaca;
      border: none;
      line-height: 50px;
      padding: 0 20px;
      height: 50px;
      &.active {
        color: #fff;
      }
      @include m() {
        font-size: 12px;
        line-height: 34px;
        height: 34px;
        padding: 0 10px;
      }
    }
  }
}
</style>
