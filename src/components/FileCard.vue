<script setup>
import {computed} from 'vue';

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
});

const fileIcons = {
  java: 'iconjava icon-java',
  xml: 'iconxml icon-xml',
  // ... 其他映射
};

const fileExtension = computed(() => {
  const parts = props.file.name.split('.');
  return parts[parts.length - 1].toLowerCase();
});

const fileIcon = computed(() => fileIcons[fileExtension.value]);
const fileName = computed(() => props.file.name);

</script>

<template>
  <div class="file-card">
    <div class="file-icon">
      <i :class="fileIcon" style="font-size: 40px"></i>
    </div>
    <div class="file-name"><a :href="file.url">{{ fileName }}</a></div>
  </div>
</template>

<style>
.file-card {
  display: flex;
  align-items: center;
  border: 1px solid rgb(220, 218, 217);
  border-radius: 7px;
  padding: 7px;

  margin-bottom: 7px;
}

.file-name {
  font-size: 20px;
  margin-left: 7px;
}

.file-card:hover {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
</style>