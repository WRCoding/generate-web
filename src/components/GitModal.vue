<script setup>

import {ref} from "vue";

let openGitModal = ref(false)


const setGitId = (gitId) => {
  console.log(gitId)
  localStorage.setItem('gitId', gitId)

  window.open('https://gitee.com/oauth/authorize?client_id=fdf5667e4fa9c97aa641ac64b60839466e3bbf45eaea00c91ca870b96cdfc737&redirect_uri=http://localhost:5173/jump&response_type=code', '_blank')
}
const openModal = () => {
  console.log(openGitModal.value)
  openGitModal.value = true
}
/**
 * 在 Vue 3 的 Composition API 中，defineExpose 是一个特殊的函数，用于明确声明哪些组件的属性和方法应该被父组件访问。这是在使用 <script setup> 语法时的一个重要特性，因为 <script setup>
 * 语法默认情况下不会将组件内部的状态或方法暴露给外部。
 * defineExpose 的使用场景主要是当你使用 <script setup> 语法编写组件时，希望父组件能够访问子组件的某些方法或属性。通过 defineExpose，你可以显式地定义哪些属性和方法是可被外部访问的。
 */
defineExpose({
  openModal
})

</script>

<template>
  <a-modal v-model:open="openGitModal" title="Git登录" width="500px" :footer="null">
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
</template>

<style scoped>

</style>