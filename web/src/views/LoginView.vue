<template>
  <div class="main" style="display: flex;align-items: center;justify-content: center;min-width:800px;height: 100%">

    <a-row
        style="width: 60%;height: 50%;display: flex;align-items: center;background: rgba(243,255,255,0.2);backdrop-filter: blur(2px);border: 1px solid #eee;border-radius: 10px">
      <a-col :span="16" :offset="4" style="position: relative;display: flex;align-items: center;flex-direction: column">

        <h1 style="text-align:center;font-weight: bold">12306
          <rocket-two-tone style="fontSize:30px "/>
          售票平台
        </h1>
        <a-form
            :model="loginForm"
            name="basic"
            :wrapper-col="{ span: 24 }"
            autocomplete="off"
            :rules="rules"
        >
          <a-form-item has-feedback
                       :wrapper-col="{span:24 }"
                       name="mobile"
          >
            <a-input size="large" placeholder="请输入手机号" v-model:value=loginForm.mobile
            />
          </a-form-item>
          <a-form-item
              :wrapper-col="{span: 24 }"
              name="code"

          >
            <a-input size="large" placeholder="请输入验证码"
                     v-model:value=loginForm.code>
              <template #addonAfter>
                <div style="font-size: 11px;color:dodgerblue" v-if="flag">{{ countdown }}秒后重新获取</div>
                <a v-else @click="sendCode">获取验证码</a>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
              :wrapper-col="{span: 24 }"
          >
            <mi-captcha theme-color="#2F9688"
                        border-color="#2F9688"
                        box-shadow-color="#2F9688"
                        height=50
                        wight=20
                        :maskClosable="true"
                        :mask="true"
                        @onSuccess="OnSuccess"
                        @onInit="init"
/>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 24 } ">
            <a-button type="primary" html-type="submit" style="width: 100%;" @click=login>登录</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>
<script setup>
// 引入
import {message, notification} from 'ant-design-vue';
import {useRouter} from "vue-router";
// 使用
import request from "@/util/request";
import {reactive, ref} from 'vue';
import store from "@/store";
const success=ref(false)
const flag1 = ref(false)
const loginForm = reactive({
  mobile: '',
  code: ''
})
// const random=ref(''+Math.random());
// const params = reactive({
//   verify:
//       {code: null}
// })
// const initAfter = (res) => {
//   if (res == '200') {
//     localStorage.setItem('mi-captcha-key', res?.data)
//     params.verify.code = res?.data
//   }
const init = () => {
  console.log('init')
}
const OnSuccess = () => {
  message.success('验证成功');
success.value=true
}
const countdown = ref(60);
let flag = ref(false)
const router = useRouter()
const sendCode = () => {
  request.get("/member/sendCode", {
    params: {
      mobile: loginForm.mobile
    }
  }).then(res => {
    if (res.code === '200') {
      notification.success({message: '提示', description: '验证码发送成功，请查收'});
      flag.value = true
      startCountdown()
    } else {
      message.error(res.msg)
    }
  })

}
let validatePhone = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('请输入手机号');
  } else if (!/^1[3456789]\d{9}$/.test(value)) {
    return Promise.reject('手机号格式错误')
  }
  return Promise.resolve();
}

const rules = {
  mobile: [
    {validator: validatePhone, trigger: 'change'}
  ]
};

/* 倒计时函数 */
const startCountdown = () => {
  const intervalId = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(intervalId);
      flag.value = false
      countdown.value = 60;
    }
  }, 1000)
}

const login = function () {
  flag1.value = true
  if(success.value){
    notification.error({message: '提示', description: '请先完成图形验证'})
    return
  }
  request.post('/member/login', loginForm).then(res => {
    if (res.code === "200") {

      store.commit('setMember', res?.data)
      message.success("登录成功")
      success.value=false
      router.push('/')

    } else {
      message.error(res.msg)
    }
  })
}

</script>
<style scoped>
.silde_box {
  margin: 0 auto;
  width: 100px;
  height: 200px;
}

.main {
  background-image: url("../assets/imgs/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
}

</style>