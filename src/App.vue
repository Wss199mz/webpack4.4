<template>
  <div>
    <h1 class="asd">
      welcom vue {{ info }}
    </h1>
    <el-radio
      v-model="radio"
      label="1"
    >
      {{ info }}
    </el-radio>
    <Page />
    <Images src="ss.png" />
    <img
      :src="ss"
      alt=""
    >
  </div>
</template>
<script>
import Page from "@/page/index.vue";
import Images from "./components/Image";
export default {
  name: "App",
  components: {
    Page,
    Images
  },
  data () {
    return {
      info: 'webpack4.0',
      radio: true
    }
  },
  mounted () {
    console.log(this.$axios);
  }
}
</script>

<style lang="scss" scoped>
.asd {
  color: blue;
}
</style>
