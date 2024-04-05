<template>
  <a-layout style="min-height: 100vh">
    <TheHeader></TheHeader>
    <a-layout style="margin-top:10px">
      <a-layout-sider v-model:collapsed="collapsed" collapsible
                      style="background: #fff;height: calc(90vh - 10px);overflow: scroll">
        <TheSider/>
      </a-layout-sider>
      <a-layout style="padding: 0 18px 18px;">
        <div style="width: min-content;height:min-content">
          <a-button type="primary" @click="() => (collapsed = !collapsed)">
            <MenuUnfoldOutlined
                v-if="collapsed"
                class="trigger"
            />
            <MenuFoldOutlined v-else class="trigger"/>
          </a-button>
        </div>

        <div style="text-align: left">

        </div>

        <!--        <a-breadcrumb style="margin: 0 auto">-->
        <!--          <a-breadcrumb-item>Home</a-breadcrumb-item>-->
        <!--          <a-breadcrumb-item>List</a-breadcrumb-item>-->
        <!--          <a-breadcrumb-item>App</a-breadcrumb-item>-->
        <!--        </a-breadcrumb>-->
        <a-layout-content
            :style="{ background: '#fff', padding: '10px', margin: 0, minHeight: '300px' }"
        >
          会员人数:{{ count }}
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import TheHeader from '@/component/the-header.vue'
import TheSider from '@/component/the-sider.vue'
import {onMounted, reactive, ref, watch} from "vue";
import request from "@/util/request";
import {message} from "ant-design-vue";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons-vue";

const count = ref('')
const collapsed = ref(false)
onMounted(() => {
  request.get("/count").then(res => {
    if (res.code === '200') {
      count.value = res?.data
    } else {
      message.error("请求数据失败")
    }
  })

})
// const items = reactiv[
//     {
//       key: '1',
//       icon: () => h(PieChartOutlined),
//       label: 'Option 1',
//       title: 'Option 1',
//     },
//         {
//           key: '2',
//           icon: () => h(DesktopOutlined),
//           label: 'Option 2',
//           title: 'Option 2',
//         },
//         {
//           key: '3',
//           icon: () => h(InboxOutlined),
//           label: 'Option 3',
//           title: 'Option 3',
//         },
//         {
//           key: 'sub1',
//           icon: () => h(MailOutlined),
//           label: 'Navigation One',
//           title: 'Navigation One',
//           children: [
//             {
//               key: '5',
//               label: 'Option 5',
//               title: 'Option 5',
//             },
//             {
//               key: '6',
//               label: 'Option 6',
//               title: 'Option 6',
//             },
//             {
//               key: '7',
//               label: 'Option 7',
//               title: 'Option 7',
//             },
//             {
//               key: '8',
//               label: 'Option 8',
//               title: 'Option 8',
//             },
//           ],
//         },
//         {
//           key: 'sub2',
//           icon: () => h(AppstoreOutlined),
//           label: 'Navigation Two',
//           title: 'Navigation Two',
//           children: [
//             {
//               key: '9',
//               label: 'Option 9',
//               title: 'Option 9',
//             },
//             {
//               key: '10',
//               label: 'Option 10',
//               title: 'Option 10',
//             },
//             {
//               key: 'sub3',
//               label: 'Submenu',
//               title: 'Submenu',
//               children: [
//                 {
//                   key: '11',
//                   label: 'Option 11',
//                   title: 'Option 11',
//                 },
//                 {
//                   key: '12',
//                   label: 'Option 12',
//                   title: 'Option 12',
//                 },
//               ],
//             },
//           ],
//         },
//     ]);e(

const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1'],
});
// const toggleCollapsed = () => {
//   state.collapsed =!state.collapsed
//   state.openKeys = state.collapsed ? [] : state.preOpenKeys
//
// }
watch(
    () => state.openKeys,
    (_val, oldVal) => {
      state.preOpenKeys = oldVal;
    }
)
</script>
<style>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-layout-sider-children {
  display: flex;
  justify-content: center;
}

.ant-layout-sider-collapsed {
  max-width: 24px !important;
}

.ant-menu-inline-collapsed {
  max-width: 24px !important;
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.folded {

}

.site-layout-background {
  background: #fff;
}
</style>