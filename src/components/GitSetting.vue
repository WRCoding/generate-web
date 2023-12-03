<script setup>
import {reactive, ref} from 'vue';
import {getRequest} from "@/js/baseApi";

let openGitSetting = ref(false)
let name = ref('')
let gitRepos = ref([])
let gitBranches = ref([])
let token = localStorage.getItem('token')
const afterOpenChange = bool => {
  console.log('open', bool);
};

const formState = reactive({
  name: '',
  repo: '',
  branch: '',
  entityPath: '',
  mapperPath: '',
  xmlPath: ''
});

const openModal = () => {
  console.log(openGitSetting.value)
  openGitSetting.value = true
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name')
  } else {
    getRequest("/user", {params: {token: token}})
        .then(response => {
          console.log(response)
          name.value = response.data.login
          localStorage.setItem('name', name.value)
        })
  }
  getRepos()
}

const getRepos = () => {
  getRequest("/repos", {params: {token: token}})
      .then(response => {
        gitRepos.value = response.data
      })
}

const getBranches = () => {
  console.log(formState.repo)
  getRequest("/branches", {params: {token: token, repo: formState.repo}})
      .then(response => {
        console.log(response)
        gitBranches.value  = response.data
      })
}

defineExpose({
  openModal
})
</script>

<template>
  <a-drawer
      v-model:open="openGitSetting"
      :root-style="{ color: 'blue' }"
      style="color: red"
      title="Git配置"
      placement="right"
      @after-open-change="afterOpenChange"
  >
    <a-form :model="formState" name="basic" :label-col="{ span: 10 }" autocomplete="off">
      <a-form-item label="用户名" name="name">
        <span>{{name}}</span>
      </a-form-item>
      <a-form-item label="仓库名" name="host">
        <a-select v-model:value="formState.repo">
          <a-select-option v-for=" item in gitRepos " :value="item.name">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="分支" name="port">
        <a-select @focus="getBranches" v-model:value="formState.branch">
          <a-select-option v-for=" item in gitBranches " :value="item.name">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="entity文件路径" name="databaseName">
        <a-input v-model:value="formState.databaseName"/>
      </a-form-item>
      <a-form-item label="mapper文件路径" name="userName">
        <a-input v-model:value="formState.userName"/>
      </a-form-item>
      <a-form-item label="xml文件路径" name="password">
        <a-input v-model:value="formState.password"/>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<style scoped>

</style>