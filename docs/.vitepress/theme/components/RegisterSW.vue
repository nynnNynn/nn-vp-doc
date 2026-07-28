<script setup>
import { onBeforeMount, ref } from 'vue'

const offlineReady = ref(false)
const needRefresh = ref(false)
const caching = ref(false)
const errorMsg = ref('')

let updateServiceWorker

function onOfflineReady() {
  caching.value = false
  offlineReady.value = true
}

function onNeedRefresh() {
  needRefresh.value = true
}

async function close() {
  offlineReady.value = false
  needRefresh.value = false
  errorMsg.value = ''
}

onBeforeMount(async () => {
  if (!('serviceWorker' in navigator)) {
    errorMsg.value = '当前浏览器不支持离线缓存'
    return
  }

  caching.value = true
  try {
    const { registerSW } = await import('virtual:pwa-register')
    updateServiceWorker = registerSW({
      immediate: true,
      onOfflineReady,
      onNeedRefresh,
      onRegisteredSW(swUrl, registration) {
        console.info('[pwa] registered', swUrl, registration?.scope)
        // 若已经是 activated，且没有 installing，认为可用
        if (registration?.active && !registration.installing) {
          caching.value = false
        }
      },
      onRegisterError(error) {
        caching.value = false
        errorMsg.value = '离线缓存注册失败'
        console.error('[pwa] register error', error)
      },
    })
  } catch (error) {
    caching.value = false
    errorMsg.value = '离线缓存加载失败'
    console.error('[pwa] import error', error)
  }
})
</script>

<template>
  <div
    v-if="caching || offlineReady || needRefresh || errorMsg"
    class="pwa-toast"
    role="status"
  >
    <div class="pwa-toast__msg">
      <template v-if="errorMsg">{{ errorMsg }}</template>
      <template v-else-if="caching && !offlineReady">正在缓存文档，请稍候再断网…</template>
      <template v-else-if="needRefresh">有新版本，刷新后更新</template>
      <template v-else>已可离线阅读</template>
    </div>
    <button
      v-if="needRefresh"
      type="button"
      class="pwa-toast__btn"
      @click="updateServiceWorker?.()"
    >
      刷新
    </button>
    <button
      v-if="!caching || offlineReady || errorMsg || needRefresh"
      type="button"
      class="pwa-toast__btn"
      @click="close"
    >
      知道了
    </button>
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
  max-width: min(360px, calc(100vw - 32px));
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-2);
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.pwa-toast__btn {
  flex-shrink: 0;
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
