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
        <router-link to="/login" @click="logout">退出系统</router-link>
      </div>

    </div>
  </a-layout-header>
</template>

<script setup>
import store from "@/store";
import {message} from "ant-design-vue";

const logout=()=>{
  store.commit("setMember",{})
  message.success("退出成功")
}

const member=JSON.parse(localStorage.getItem("member"))
</script>

<style scoped>

</style>