<template>
  <div class="Main paeg-editor">
    <div
      ref="canvasContainer"
      class="editor-container"
      :style="{
        '--aspect-ratio': aspectRatio,
      }"
    >
      <canvas
        ref="canvasDom"
        id="editor-canvas"
        width="200"
        height="100"
        style="border: 1px solid #ccc"
      >
        您的浏览器不支持canvas，请更换浏览器后再试。
      </canvas>
    </div>
    <div v-if="isLoadConfig" class="editor-fields mt-4">
      <van-form>
        <div class="mb-4">
          <van-button round block type="primary" @click="previewImage">
            生成图片
          </van-button>
        </div>
        <van-cell-group inset>
          <van-field
            v-for="field of strategy.fields"
            :label="field.name"
            :key="field.type + field.name + field.default"
            v-model="field.instance.value"
            :placeholder="'请输入' + field.name"
            :rules="[{ required: true, message: '请填写' + field.name }]"
          />
        </van-cell-group>
        <p class="text-gray-400 text-sm mt-2 px-2">
          若生成效果不佳，可以直接点击图片中的元素进行微调。
        </p>
      </van-form>
    </div>
    <van-popup
      v-if="isLoadConfig"
      v-model:show="showImagePreview"
      round
      position="bottom"
      teleport="body"
      closeable
      :style="{ height: '75%' }"
      :duration="0.2"
    >
      <div class="p-6">
        <h2 class="font-bold text-xl mb-2">图片预览</h2>
        <img :src="imageDataUrl" alt="" />
        <p class="text-gray-400 text-sm mt-2">
          图片大小：{{ imageFileSize.toFixed(2) }}MB
        </p>
        <div class="mt-8">
          <van-button round block type="primary" @click="downloadImage">
            下载图片
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
import { fabric } from "fabric";
import config from "../utils/config.json";

const canvasDom = ref(null);
const canvasContainer = ref(null);
const canvasWidth = ref(0);
const canvasHeight = ref(0);
const aspectRatio = ref("16 / 9");
const strategy = ref(config);
const imageDataUrl = ref("");
const imageFileSize = ref(0);

const isLoadConfig = ref(false);
const showImagePreview = ref(false);

let canvas = null;

function resizeCanvas() {
  if (!canvasDom.value || !canvasContainer.value) return;
  aspectRatio.value = `${
    (strategy.value.width / strategy.value.height) * 100
  }%`;
  nextTick(() => {
    const { width, height } = canvasContainer.value.getBoundingClientRect();
    canvasDom.value.width = width;
    canvasDom.value.height = height;
    canvasWidth.value = width;
    canvasHeight.value = height;
    initCanvas();
  });
}

function initCanvas() {
  canvas = new fabric.Canvas("editor-canvas");
  canvas.setWidth(canvasWidth.value);
  canvas.setHeight(canvasHeight.value);
  // 背景图片
  const img = new Image();
  img.setAttribute("crossOrigin", "anonymous");
  img.src = strategy.value.baseImg;
  img.onload = () => {
    const fabricImage = new fabric.Image(img, {
      crossOrigin: "anonymous",
    });
    // 设置背景图
    const scaleX = canvasWidth.value / img.width;
    const scaleY = canvasHeight.value / img.height;
    canvas.setBackgroundImage(fabricImage, canvas.renderAll.bind(canvas), {
      scaleX,
      scaleY,
    });
    handleConfig();
  };
}

function handleConfig() {
  strategy.value.fields = strategy.value.fields.map((field) => {
    field.instance = {
      fabricText: null,
      get value() {
        return field.value;
      },
      set value(val) {
        field.value = val;
        if (field.instance.fabricText) {
          field.instance.fabricText.set("text", val);
          canvas.renderAll();
        }
      },
      init() {
        field.instance.value = field.default;
        field.instance.fabricText = new fabric.Text(field.instance.value, {
          left: field.position.x,
          top: field.position.y,
          ...field.style,
          fontFamily: field.style.fontFamily || "Microsoft YaHei",
        });
        if (canvas) {
          canvas.add(field.instance.fabricText);
        }
      },
    };
    field.instance.init();
    return field;
  });
  isLoadConfig.value = true;
}

function previewImage() {
  const dataURL = canvas.toDataURL({
    format: "png",
    quality: 1,
  });
  imageDataUrl.value = dataURL;
  imageFileSize.value = (dataURL.length * 3) / 4 / 1024 / 1024;
  showImagePreview.value = true;
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = `表情包生成器_${new Date().getTime()}.png`;
  link.href = imageDataUrl.value;
  link.click();
}

onMounted(() => {
  resizeCanvas();
});
</script>

<style scoped>
/* .editor-container {
  border: 1px solid red;
} */

.editor-container::before {
  float: left;
  padding-top: var(--aspect-ratio, 56.25%);
  content: "";
}

.editor-container::after {
  display: block;
  content: "";
  clear: both;
}

:deep(.van-cell-group--inset) {
  margin: 0;
}
</style>
