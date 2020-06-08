<template>
  <router-view> </router-view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.banner {
  &-section {
    height: 800px;
    background: #333 url(/src/assets/banner.png) no-repeat;
    background-size: cover;
    position: relative;
  }
}
</style>
