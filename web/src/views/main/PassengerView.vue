<template>
  <div>
    <div style="text-align: left;padding: 5px 0  0 5px">
      <a-button type="primary" danger @click="visible = true">新增</a-button>
    </div>
    <a-table :data-source="dataSource" :columns="columns" :pagination=pagination @change="onChange">
    </a-table>
    <!--    <a-pagination size="small" :total="50" />-->

    <a-modal
        v-model:visible="visible"
        title="新增乘客"
        @ok="handleOk"
        ok-text="确认"
        cancel-text="取消"
        keyboard
    >
      <a-form :model="passenger" :label-col="{span:5}" :wrapper-col="{}">
        <a-form-item label="姓名">
          <a-input v-model:value="passenger.name"/>
        </a-form-item>
        <a-form-item label="身份证">
          <a-input v-model:value="passenger.idCard"/>
        </a-form-item>

        <a-form-item label="类型">
          <a-radio-group v-model:value="passenger.type" name="radioGroup">
            <a-radio value="1">学生</a-radio>
            <a-radio value="2">成人</a-radio>
            <a-radio value="3">儿童</a-radio>
          </a-radio-group>

        </a-form-item>
      </a-form>

    </a-modal>
  </div>
</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import request from "@/util/request";
import {message, notification} from "ant-design-vue";

const pagination = reactive({
  total: 0,
  pageSize: 4,
  current: 1
})
const dataSource = ref([])
const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: 'Id',
    dataIndex: 'id'
  },
  {
    title: '会员',
    dataIndex: 'memberId'
  },
  {
    title: '身份证',
    dataIndex: 'idCard'
  },
  {
    title: '乘客类型',
    dataIndex: 'type'
  },
])
const onChange = (page) => {
  console.log(page)
  handlePage({
    pageNum: page.current,
    pageSize: page.pageSize
  })
}
const visible = ref(false);
const passenger = reactive(
    {
      name: '',
      idCard: '',
      type: '1'
    }
);
onMounted(() => {
  handlePage({
    pageNum: pagination.current,
    pageSize: pagination.pageSize
  })
})
const handlePage = (param) => {
  request.get("/passenger/queryList", {
    params: {
      pageNum: param.pageNum,
      pageSize: param.pageSize
    }
  }).then(res => {
    if (res.code === '200') {
      dataSource.value = res.data?.list
      pagination.current = res.data?.pageNum
      pagination.total=res.data?.total
    }

})
}
// const showModal = () => {
//   visible.value = true;
// };
const handleOk = () => {
  request.post("/passenger/save", passenger).then(res => {
    if (res.code === '200') {
      message.success({content: "新增成功"})
      visible.value = false;
      handlePage({
        pageNum: pagination.current,
        pageSize: pagination.pageSize
      })
    } else {
      notification.error({message: res.msg})
    }
  })

}
</script>

<style scoped>

</style>