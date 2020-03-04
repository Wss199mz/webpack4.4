<template>
 <div>
   <h1 class="asd">welcom vue {{ info }}</h1>
   <el-radio v-model="radio" label="1">{{ info }}80</el-radio>
   <Page />
 </div>
</template>

<script>
  import Page from "@/page/index.vue";
  export default {
    name: "App",
    components: {
      Page
    },
    data() {
      return {
        info: 'webpack4.0',
        radio: true
      }
    },
    mounted() {
      console.log(this.$axios);
    }
  }
</script>

<style scoped>
.asd {
  color: blue;
}
</style>
