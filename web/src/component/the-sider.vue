<template>

    <a-menu
        v-model:selectedKeys="state.selectedKeys"
        v-model:openKeys="state.openKeys"
        mode="inline"
        :inline-collapsed="state.collapsed"
        :style="{ height: '100%', borderRight: 0 }"
    >
      <a-sub-menu key="/" :popupOffset="10">
        <template #title>
        <span>
          <user-outlined/>
                subnav 1
        </span>
        </template>
        <a-menu-item key="/welcome">
          <router-link to="/welcome">
            <CoffeeOutlined/>
            欢迎页
          </router-link>
        </a-menu-item>
        <a-menu-item key="/passenger">
          <router-link to="/passenger" >
            <user-outlined/>
          <span style="margin-left: 10px">乘客人管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">option3</a-menu-item>
        <a-menu-item key="4">option4</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
              <span>
                <laptop-outlined/>
                subnav 2
              </span>
        </template>
        <a-menu-item key="5">option5</a-menu-item>
        <a-menu-item key="6">option6</a-menu-item>
        <a-menu-item key="7">option7</a-menu-item>
        <a-menu-item key="8">option8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <template #title>
              <span>
                <notification-outlined/>
                subnav 3
              </span>
        </template>
        <a-menu-item key="9">option9</a-menu-item>
        <a-menu-item key="10">option10</a-menu-item>
        <a-menu-item key="11">option11</a-menu-item>
        <a-menu-item key="12">option12</a-menu-item>
      </a-sub-menu>
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
.ant-menu-title-content{
  width: 150px!important;
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
.ant-menu-item{
  padding-left: -10px!important;
}
.site-layout-background {
  background: #fff;
}
</style>