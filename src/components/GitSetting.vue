<script setup>

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

</script>

<template>
  <a-modal v-model:open="open" title="Git登录" width="500px" :footer="null">
    <i class="icongit icon-gitee" style="font-size: 40px"> Gitee登录</i>
    <i class="icongit icon-GitHub" style="font-size: 40px"> GitHub登录</i>
  </a-modal>
</template>

<style scoped>

</style>