<template>
  <div class="hello">
   <div>{{ num | formatNum }}</div>
    <div>{{ data }}</div>
    <div><a :href="globalUrl" target="_blank">{{ globalUrl }}</a></div>
  </div>
</template>

<script>
  import Data from './data.json';
  export default {
    data() {
      return {
        data: Data,
        num: 123456.123456
      }
    },
    computed: {
      globalUrl() {
        return this.$store.state.globalUrl
      }
    },
    mounted() {
      console.log(this.$axios.get('/api/user'))
    }
  }
</script>

<style lang="scss">
.hello {
  color: red;
  a {
    text-decoration: none;
    color: gray;
  }
}
</style>
