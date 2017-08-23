<template>

  <div>
    <abount v-if="name=='about'" v-on:back="pageBack"></abount>
    <nick-name v-if="name=='nickname'" v-on:back="pageBack"></nick-name>
    <select-sex v-if="name=='sex'" v-on:back="pageBack"></select-sex>
  </div>

</template>


<style lang="less" scoped></style>


<script>

  import Abount from './Abount'
  import NickName from './NickName'
  import SelectSex from './SelectSex'

  export default {

    components: {
      Abount,
      NickName,
      SelectSex
    },

    data(){
      return {
        name: ""
      }
    },

    created(){
      this.name = this.$router.currentRoute.params.name;
    },
    methods: {
      pageBack(){
        this.$router.go(-1)
      }

    }
  }

</script>
