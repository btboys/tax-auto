<script lang="tsx" setup>
import { h, ref } from 'vue'
import { PaginationProps, TableProps } from 'tdesign-vue-next'
import { layer } from '@layui/layer-vue'
import AccountForm from '@renderer/components/AccountForm.vue'
import localforage from 'localforage'
import { Account } from '@renderer/env'
import { getLoginUrl } from '@renderer/js/taxation'

const data = ref<Account[]>([])
const pagination = ref<PaginationProps>({
  defaultCurrent: 1,
  defaultPageSize: 20,
  total: 0
})

const columns = ref<TableProps['columns']>([
  {
    colKey: 'area',
    title: '区域',
    width: '100'
  },
  {
    colKey: 'loginType',
    title: '登录方式',
    width: 100
  },
  {
    colKey: 'creditCode',
    title: '统一社会信用代码/纳税人识别号',
    ellipsis: true
  },
  {
    colKey: 'account',
    title: '身份证号码/手机号码/用户名'
  },
  {
    title: '操作',
    colKey: 'id',
    width: 200,
    fixed: 'right'
  }
])

localforage.getItem<Account[]>('account').then((value) => {
  if (value) {
    data.value = value || []
  }
  pagination.value.total = data.value.length
})

const showForm = (entity = null): void => {
  const lid = layer.open({
    title: '添加账号',
    content: h(AccountForm, {
      entity,
      onSuccess: () => {
        localforage.getItem<Account[]>('account').then((value) => {
          if (value) {
            data.value = value
            pagination.value.total = value.length
          }
        })
        layer.close(lid)
      }
    }),
    zIndex: 100,
    area: ['600px', 'auto']
  })
}

const deleteAccount = (row: Account): void => {
  layer.confirm('确定删除该账号吗？', {
    title: '提示',
    yes: (id: number) => {
      localforage.getItem<Account[]>('account').then((value) => {
        if (value) {
          const index = value.findIndex((item: Account) => item.id === row.id)
          value.splice(index, 1)
          localforage.setItem('account', value)
          data.value = value
          pagination.value.total = value.length
        }
        layer.close(id)
      })
    }
  })
}

const openLogin = (row: Account): void => {
  localforage.getItem<string>('browserPath').then((value) => {
    if (!value) {
      layer.msg('请先设置浏览器路径')
      return
    }

    window.electron.ipcRenderer.send('openLogin', {
      executablePath: value,
      loginUrl: getLoginUrl(row.area),
      ...row
    })
  })
}
</script>

<template>
  <t-space direction="vertical">
    <t-button @click="showForm()">添加账号</t-button>
    <!-- 当数据为空需要占位时，会显示 cellEmptyContent -->
    <t-table
      height="calc(100vh - 248px)"
      row-key="index"
      :data="data"
      :columns="columns"
      :stripe="true"
      :bordered="true"
      :hover="true"
      :pagination="pagination"
      cell-empty-content="-"
      :resizable="true"
    >
      <template #id="{ row }">
        <t-space>
          <t-link theme="primary" hover="color" @click="openLogin(row)">打开登录</t-link>
          <t-link theme="primary" hover="color" @click="showForm(row)">编辑</t-link>
          <t-link theme="primary" hover="color" @click="deleteAccount(row)">删除</t-link>
        </t-space>
      </template>
    </t-table>
  </t-space>
</template>
