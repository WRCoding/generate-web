<script setup>

import {onMounted} from "vue";
import {getRequest} from "@/js/baseApi";
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
onMounted(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let code = urlParams.get('code');
  if (code !== null) {
    console.log(localStorage.getItem('gitId'))
    code = localStorage.getItem('gitId') + '@' + code
    console.log(code)
    getRequest("/asToken", {params: {code: code}})
        .then(response => {
          console.log(response.data)
          localStorage.setItem('token',response.data)
          router.push('/')
        })
  }
})
</script>

<template>
  <a-result
      status="success"
      title="Git登录成功,正在跳转到首页"
  >
  </a-result>
</template>

<style scoped>

</style>