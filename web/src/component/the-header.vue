<template>
  <a-layout-header class="header" style="display: flex;;">
    <div class="logo" style="flex: .8"/>
    <div style="flex: 5">
      <a-menu
          theme="dark"
          mode="horizontal"
          v-model:selectedKeys="selectedKeys"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="/welcome">
          <router-link to="/welcome">
            欢迎页
          </router-link>
        </a-menu-item>
        <a-menu-item key="/passenger">
          <router-link to="/passenger">
            <span style="margin-left: 10px">乘客人管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/ticket">
          <router-link to="/ticket">
            <span style="margin-left: 10px">余票查询</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </div>
    <div style="flex: 2;color: white;font-weight: 400;font-size: 17px;display: flex">
      <div style="flex: 2">
        <span style="white-space: nowrap;text-overflow: ellipsis">你好! {{ member.mobile }}</span>
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
import {ref, watch} from "vue";
import router from "@/router";

const selectedKeys = ref([])
const logout = () => {
  store.commit("setMember", {})
  message.success("退出成功")
}
watch(() => router.currentRoute.value.path, (newValue) => {
  selectedKeys.value = []
  selectedKeys.value.push(newValue)
}, {immediate: true})

const member = JSON.parse(localStorage.getItem("member"))
</script>

<style scoped>

</style>