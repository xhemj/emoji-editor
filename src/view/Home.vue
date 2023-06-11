<template>
  <div class="Main">
    <Nav />
    <!-- <RouterLink to="/editor">
      <van-button type="primary">打开编辑器</van-button>
    </RouterLink> -->
    <div class="absolute left-0 right-0 top-12">
      <van-tabs v-model:active="activeTab">
        <van-tab v-for="item of emojiCategory" :title="item.title">
          <TemplatePreview :category="item.value" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Nav from "../components/Nav.vue";
import TemplatePreview from "../components/TemplatePreview.vue";

const activeTab = ref(0);
// 表情包分类
const emojiCategory = [
  {
    title: "人物",
    value: ["dzx", "pg"],
  },
  {
    title: "搞笑",
    value: ["shide"],
  },
];
const allEmoji = emojiCategory.reduce((prev, cur) => {
  return prev.concat(cur.value);
}, []);
emojiCategory.unshift({
  title: "所有内容",
  value: allEmoji,
});
</script>

<style scoped></style>
