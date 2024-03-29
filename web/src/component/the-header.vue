<template>
  <a-layout-header class="header" style="display: flex;;">
    <div class="logo" style="flex: .8"/>
    <div style="flex: 5">
      <!--  -->
    </div>
    <div style="flex: 2;color: white;font-weight: 400;font-size: 17px;display: flex">
      <div style="flex: 2">
        <span style="white-space: nowrap;text-overflow: ellipsis">你好! {{member.mobile}}</span>
      </div>
      <div style="flex: 2">
        <router-link to="/login">退出系统</router-link>
      </div>

    </div>
  </a-layout-header>
</template>

<script setup>
// import {ref} from "vue";
import store from "@/store";
// const selectedKeys1 = ref(['1'])
let member = store.state.a.member
console.log(member.mobile)
</script>

<style scoped>

</style>