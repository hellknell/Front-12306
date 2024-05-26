<template>

  <a-menu
      v-model:selectedKeys="state.selectedKeys"
      v-model:openKeys="state.openKeys"
      mode="inline"
      :inline-collapsed="state.collapsed"
      :style="{ height: '100%', borderRight: 0 }"
  >
    <a-menu-item key="/welcome">
      <router-link to="/welcome">
        <CoffeeOutlined/>
        欢迎页
      </router-link>
    </a-menu-item>
    <a-menu-item key="/passenger">
      <router-link to="/passenger">
        <user-outlined/>
        <span style="margin-left: 10px">乘客人管理</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="/ticket">
      <router-link to="/ticket">
        <user-outlined/>
        <span style="margin-left: 10px">余票查询</span>
      </router-link>
    </a-menu-item>


  </a-menu>

</template>
<script setup>
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons-vue';
import {reactive, watch} from 'vue';
import router from "@/router";

const state = reactive({

  collapsed: false,
  selectedKeys: [],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1'],
});
// const toggleCollapsed = () => {
//   state.collapsed = !state.collapsed;
//   state.openKeys = state.collapsed ? [] : state.preOpenKeys;
// };
watch(() => router.currentRoute.value.path, (newValue) => {
  state.selectedKeys = []
  state.selectedKeys.push(newValue)
}, {immediate: true})
</script>
<style>
.ant-menu-title-content {
  width: 150px !important;
}

#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.ant-menu-item {
  padding-left: -10px !important;
}

.site-layout-background {
  background: #fff;
}
</style>