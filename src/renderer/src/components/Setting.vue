<script setup lang="ts">
import { reactive } from 'vue'
import localforage from 'localforage'

const formData = reactive({
  browserPath: ''
})

localforage.getItem<string>('browserPath').then(async (res) => {
  if (res) {
    formData.browserPath = res
  } else {
    if (window.electron.ipcRenderer.sendSync('platform') === 'win32') {
      formData.browserPath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    } else {
      formData.browserPath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    }
  }
})

const dirHandle = (): void => window.electron.ipcRenderer.send('dir')

const ipcHandle = (): void => {
  window.electron.ipcRenderer.send('test', formData.browserPath)
}

window.electron.ipcRenderer.on('dir', (_, arg) => {
  formData.browserPath = arg
})

window.electron.ipcRenderer.on('testSuccess', () => {
  localforage.setItem('browserPath', formData.browserPath)
  alert('浏览器设置成功')
})

window.electron.ipcRenderer.on('testError', (_, arg) => {
  if (arg.startsWith('browserType.launch: Failed')) {
    alert('请选择正确的浏览器路径')
  } else {
    alert(arg)
  }
})
</script>

<template>
  <t-space direction="vertical" class="w-full">
    <t-input-adornment prepend="Google浏览器">
      <t-input v-model="formData.browserPath" placeholder="请选择Google浏览器的安装目录" />
      <template #append>
        <t-button @click="dirHandle">选择安装目录</t-button>
      </template>
    </t-input-adornment>
    <t-button @click="ipcHandle">保存并测试浏览器</t-button>
  </t-space>
</template>
