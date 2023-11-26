<script setup>
import {ref, reactive, computed} from "vue";
import {getRequest, postRequest} from "@/js/baseApi.js";
import FileCard from "@/components/FileCard.vue";
import {onMounted} from "vue";
let chose = ref('file')
let open = ref(false)
let openChoseDataSource = ref(false)
let openGenerateCode = ref(false)
let openGitSetting = ref(false)
let dataSourceList = ref([])
let javaTableList = ref([])
let choseId = ref(0)
let urlMapper = ref([])

onMounted(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let code = urlParams.get('code');
  if (code !== null){
    console.log(localStorage.getItem('gitId'))
    code = localStorage.getItem('gitId') + '@' + code
    console.log(code)
    getRequest("/asToken", {params: {code:code}})
        .then(response => {

        })
  }
})

const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
});
const formState = reactive({
  name: '',
  host: '',
  port: 3306,
  databaseName: '',
  username: '',
  password: ''
});
const dataSourceId = computed(() => choseId);

const generateRequest = reactive({
  dataSourceId: dataSourceId.value,
  entityPath: '',
  mapperPath: '',
  xmlPath: '',
  tableNames: []
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

const handleBtnDataSource = () => {
  console.log('aaaaa');
  openChoseDataSource.value = true
  getRequest('/showDataSourceConfig').then(response => {
    dataSourceList.value = response.data
    console.log(dataSourceList.value[0])
  })
}

const choseIdBtn = () => {
  openChoseDataSource.value = false
  console.log(choseId.value)
  getRequest("/showTables", {params: {dataSourceId: choseId.value}})
      .then(response => {
        javaTableList.value = response.data
        console.log(javaTableList.value)
      })
}

const testConnect = () => {
  console.log(formState)
  postRequest("/testConnect", JSON.stringify(formState)).then(response => {
    console.log(response)
  })
}

const addDataSource = () => {
  console.log(JSON.stringify(formState))
  postRequest("/save", JSON.stringify(formState)).then(response => {
    console.log(response)
  })
}

const handleBtnGenerateCode = () => {
  openGenerateCode.value = true
}

const generateCode = () => {
  console.log(generateRequest)
  postRequest("/generate", JSON.stringify(generateRequest)).then(response => {
    console.log(response)
    urlMapper.value = response.data
  })
}

const changeSetting = () => {
  if (chose.value === 'git') {
    openGitSetting.value = true
  }
}

const setGitId = (gitId) => {
  console.log(gitId)
  localStorage.setItem('gitId', gitId)
}

</script>

<template>
  <div class="main" style="margin-top: 7px;">
    <div class="setBox">
      <a-button style="margin-left: 7px; margin-right: 7px;" type="primary" @click="handleClick">数据库配置</a-button>
      <a-radio-group v-model:value="chose" @change="changeSetting">
        <a-radio-button value="flie">导出文件</a-radio-button>
        <a-radio-button value="git">Git提交</a-radio-button>
      </a-radio-group>
      <a-button style="margin-left: 7px; margin-right: 7px; color: blue;" @click="handleBtnDataSource">数据源选择
      </a-button>
      <a-button v-if="choseId !== 0" style="margin-left: 7px; margin-right: 7px; color: blue;"
                @click="handleBtnGenerateCode">生成代码
      </a-button>
    </div>
    <div class="showBox" style="background-color: rgb(243, 243, 243); margin-top: 7px;">
      <a-card style="margin-top: 7px;margin-left: 7px;flex-basis: auto;" v-for=" item in javaTableList">
        <p>库名: {{ item.databaseName }}</p>
        <p>表名: {{ item.name }}</p>
        <p>注释: {{ item.comment }}</p>
        <p>创建时间: {{ item.createTime }}</p>
      </a-card>
    </div>


    <a-modal v-model:open="open" title="数据库配置" width="400px" :footer="null">
      <a-form :model="formState" name="basic" :label-col="{ span: 7 }" autocomplete="off"
              @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="数据源别名" name="name"
                     :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.name"/>
        </a-form-item>
        <a-form-item label="数据库地址" name="host"
                     :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.host"/>
        </a-form-item>
        <a-form-item label="数据库端口" name="port"
                     :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.port"/>
        </a-form-item>
        <a-form-item label="数据库库名" name="databaseName"
                     :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input v-model:value="formState.databaseName"/>
        </a-form-item>
        <a-form-item label="用户名" name="userName"
                     :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input v-model:value="formState.userName"/>
        </a-form-item>
        <a-form-item label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password"/>
        </a-form-item>
      </a-form>
      <div style="text-align: right">
        <span style="padding: 7px; margin-left: 7px;color: rgb(121, 169, 120)" class="modelBtn" @click="testConnect">测试链接</span>
        <span style="padding: 7px; margin-left: 7px; color: rgb(56, 117, 246)" class="modelBtn" @click="addDataSource">确定</span>
      </div>
    </a-modal>

    <a-modal v-model:open="openChoseDataSource" title="数据源选择" width="500px" :footer="null">
      <div style="overflow-y: auto;">
        <a-radio-group v-model:value="choseId">
          <a-radio v-for="dataSource in dataSourceList" :style="radioStyle" :value="dataSource.id">
            <span>Name: <span style="font-weight: bold">{{ dataSource.name }}</span>, URL: <span
                style="font-weight: bold">{{ dataSource.url }}</span></span>
          </a-radio>
        </a-radio-group>
      </div>
      <div style="text-align: right">
        <span style="padding: 7px; margin-left: 7px; color: rgb(56, 117, 246)" class="modelBtn"
              @click="choseIdBtn">确定</span>
      </div>
    </a-modal>

    <a-modal v-model:open="openGenerateCode" title="生成代码" width="500px" :footer="null">
      <a-form :model="generateRequest" name="basic" :label-col="{ span: 7 }" autocomplete="off"
              @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="实体类路径" name="entityPath">
          <a-input v-model:value="generateRequest.entityPath"/>
        </a-form-item>
        <a-form-item label="Mapper接口路径" name="mapperPath">
          <a-input v-model:value="generateRequest.mapperPath"/>
        </a-form-item>
        <a-form-item label="MapperXml路径" name="xmlPath">
          <a-input v-model:value="generateRequest.xmlPath"/>
        </a-form-item>
        <a-form-item label="Select">
          <a-select v-model:value="generateRequest.tableNames" mode="multiple">
            <a-select-option v-for="item in javaTableList" :value="item.name">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <div style="text-align: right">
        <span style="padding: 7px; margin-left: 7px; color: rgb(56, 117, 246)" class="modelBtn"
              @click="generateCode">确定</span>
      </div>
      <div v-if="urlMapper.length > 0" style="margin-top: 7px">
        <FileCard v-for="item in urlMapper" :file="item"/>
      </div>
    </a-modal>

    <a-modal v-model:open="openGitSetting" title="Git登录" width="500px" :footer="null">
      <div style="display: flex;flex-direction: column;align-items: center">
        <div class="gitDiv" @click="setGitId('gitee')">
          <i class="icongit icon-gitee" style="font-size: 40px"> </i>
          <div style="font-size: 20px;padding: 10px">Gitee</div>
        </div>
        <div class="gitDiv" @click="setGitId('github')">
          <i class="icongit icon-GitHub" style="font-size: 40px"> </i>
          <div style="font-size: 20px;padding: 3px">GitHub</div>
        </div>
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

.gitDiv {
  border: 1px solid rgb(128, 128, 128);
  border-radius: 7px;
  padding: 2px 10px;
  margin-top: 7px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.gitDiv:hover{
  cursor: pointer;
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

.modelBtn:hover {
  cursor: pointer;
}
</style>
