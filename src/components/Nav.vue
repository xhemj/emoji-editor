<template>
  <div
    class="absolute top-0 left-0 right-0 flex items-center justify-center h-12 bg-white z-20"
  >
    <div class="font-semibold text-black text-lg">{{ title }}</div>
    <div
      v-if="!isHome"
      class="absolute top-4 left-4 w-[24px] h-[24px] cursor-pointer"
      @click="onClickBack"
    >
      <van-icon name="arrow-left" size="1.25rem" color="#969799" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
});

const title = computed(
  () => props.title || router.currentRoute.value.meta.title
);
const isHome = computed(() => router.currentRoute.value.name === "home");

const onClickBack = () => {
  router.push({
    query: {
      id: null,
    },
  });
  router.back();
};
</script>

<style scoped></style>
