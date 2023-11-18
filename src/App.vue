<script setup>
import { ref,reactive } from "vue";

let chose = ref('file')
let open = ref(false)
const formState = reactive({
  username: '',
  password: '',
  remember: true,
});
const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const handleClick = () => {
  console.log('点击');
  open.value = true
}
</script>

<template>
  <div class="main" style="margin-top: 7px;">
    <div class="setBox">
      <a-button style="margin-left: 7px; margin-right: 7px;" type="primary" @click="handleClick">数据库配置</a-button>
      <a-radio-group v-model:value="chose">
        <a-radio-button value="flie">导出文件</a-radio-button>
        <a-radio-button value="git">Git提交</a-radio-button>
      </a-radio-group>
    </div>
    <div class="showBox" style="background-color: rgb(243, 243, 243); margin-top: 7px;">
      <a-card style="margin-top: 7px;margin-left: 7px;flex-basis: auto;" v-for=" item in 10">
        <p>库名: wchat</p>
        <p>表名: user_info</p>
        <p>创建时间: 2023-10-31 12:31:00</p>
        <a-button>生成代码</a-button>
      </a-card>
    </div>

    <a-modal v-model:open="open" title="数据库配置" width="400px" :footer="null" >
      <a-form :model="formState" name="basic" :label-col="{ span: 7 }"  autocomplete="off"
        @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="数据库地址" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item label="数据库库名" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input v-model:value="formState.password" />
        </a-form-item>
        <a-form-item label="用户名" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input v-model:value="formState.password" />
        </a-form-item>
        <a-form-item label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
      </a-form>
      <div style="text-align: right">
        <span style="padding: 7px; margin-left: 7px;color: rgb(121, 169, 120)" class="modelBtn">测试链接</span>
        <span style="padding: 7px; margin-left: 7px; color: rgb(56, 117, 246)" class="modelBtn">确定</span>
      </div>
    </a-modal>
  </div>
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  /* overflow: hidden; */
}

#app {
  width: 100%;
  height: 100%;
}

.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.setBox {
  width: 100%;
  /* height: 100px; */
  display: flex;
}

.showBox {
  flex: 1;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.modelBtn:hover{
  cursor: pointer;
}
</style>
