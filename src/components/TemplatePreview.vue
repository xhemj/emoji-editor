<template>
  <div class="bg-white">
    <div class="flex flex-wrap flex-row w-full">
      <div v-for="item of category" class="w-1/2 text-center align-middle">
        <div
          class="p-4 flex justify-center items-center flex-col h-full cursor-pointer"
          @click="onClickTemplate(item)"
        >
          <img
            class="m-auto max-h-32 h-auto w-auto rounded-md shadow-md"
            :src="getPreviewImage(item)"
            :alt="getPreviewName(item)"
          />
          <p class="mt-1 text-base">{{ getPreviewName(item) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getConfig } from "../utils";
import { useRouter } from "vue-router";

const router = useRouter();
defineProps({
  category: {
    type: Array,
    required: true,
  },
});

function getPreviewImage(item) {
  return getConfig(item).previewImg;
}

function getPreviewName(item) {
  return getConfig(item).name;
}

function onClickTemplate(item) {
  router.push({
    name: "create",
    query: {
      id: item,
    },
  });
}
</script>

<style scoped></style>
