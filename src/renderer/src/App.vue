<template>
  <t-layout class="h-full">
    <t-aside>
      <t-menu theme="light" :default-value="currentPage" @change="setPage">
        <template #logo>
          <div class="logo"><b class="vue">税务自动化平台</b></div>
        </template>
        <t-menu-item value="Accounts">
          <template #icon>
            <t-icon name="dashboard" />
          </template>
          税务账号
        </t-menu-item>
        <t-menu-item value="Setting">
          <template #icon>
            <t-icon name="dashboard" />
          </template>
          系统设置
        </t-menu-item>
      </t-menu>
    </t-aside>
    <t-layout>
      <t-content class="m-4 p-4 bg-white">
        <component :is="currentPage" />
      </t-content>
      <t-footer class="text-center text-red-600"
        >Copyright @ 2019-{{ new Date().getFullYear() }} Tencent. All Rights Reserved
      </t-footer>
    </t-layout>
  </t-layout>
</template>
<script setup lang="ts">
import { defineOptions } from 'vue'
import { storeToRefs } from 'pinia'
import Accounts from '@renderer/components/Accounts.vue'
import Setting from '@renderer/components/Setting.vue'
import { useStore } from '@renderer/store'

const store = useStore()
const { setPage } = store
const { currentPage } = storeToRefs(store)

defineOptions({
  name: 'App',
  components: {
    Accounts,
    Setting
  }
})
</script>
