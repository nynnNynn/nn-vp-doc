<script setup>
import { onBeforeMount, ref } from 'vue'

const offlineReady = ref(false)

function onOfflineReady() {
  offlineReady.value = true
}

async function close() {
  offlineReady.value = false
}

onBeforeMount(async () => {
  const { registerSW } = await import('virtual:pwa-register')
  registerSW({
    immediate: true,
    onOfflineReady,
  })
})
</script>

<template>
  <div
    v-if="offlineReady"
    class="pwa-toast"
    role="status"
  >
    <div class="pwa-toast__msg">已可离线阅读</div>
    <button type="button" class="pwa-toast__btn" @click="close">知道了</button>
  </div>
</template>

<style scoped>
.pwa-toast {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-2);
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.pwa-toast__btn {
  padding: 4px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: transparent;
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.pwa-toast__btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
</style>
