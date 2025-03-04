<script setup lang="ts">
import { defineEmits, defineProps, reactive } from 'vue'
import localforage from 'localforage'
import { uid } from 'radash'
import { areaList } from '@renderer/js/taxation'
import { Account } from '@renderer/env'

const emits = defineEmits(['success'])
const props = defineProps(['entity'])

const form = reactive({
  id: '',
  area: '',
  loginType: '企业业务',
  password: '',
  creditCode: '',
  account: ''
} as Account)

props.entity && Object.assign(form, props.entity)

const rules = {
  account: [{ required: true, message: '请输入身份证号码/手机号码/用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入个人用户密码', trigger: 'blur' }],
  creditCode: [{ required: true, message: '请输入统一社会信用代码/纳税人识别号', trigger: 'blur' }],
  area: [{ required: true, message: '请选择纳税区域', trigger: 'blur' }]
}

const onSubmit = (): void => {
  const entity = { ...form }
  localforage.getItem('account').then((value) => {
    if (entity.id) {
      const index = value.findIndex((item: Account) => item.id === entity.id)
      value[index] = entity
    } else {
      if (!value) {
        value = []
      }
      entity.id = uid(8)
      value.push(entity)
    }

    localforage.setItem('account', value).then(() => {
      emits('success')
    })
  })
}
</script>

<template>
  <div class="p-5">
    <t-form label-align="top" :data="form" :rules="rules" @submit="onSubmit">
      <div class="flex">
        <t-form-item label="纳税区域" name="area" class="flex-1 mr-6">
          <t-select v-model="form.area" placeholder="请选择纳税区域">
            <t-option
              v-for="item in areaList"
              :key="item.key"
              :label="item.title"
              :value="item.key"
            />
          </t-select>
        </t-form-item>
        <t-form-item label="登录类型" name="loginType" class="flex-1">
          <t-radio-group v-model="form.loginType" default-value="企业业务">
            <t-radio value="企业业务">企业业务</t-radio>
            <t-radio value="代理业务">代理业务</t-radio>
          </t-radio-group>
        </t-form-item>
      </div>
      <t-form-item label="统一社会信用代码/纳税人识别号" name="creditCode">
        <t-input v-model="form.creditCode" placeholder="请输入统一社会信用代码/纳税人识别号" />
      </t-form-item>
      <t-form-item label="身份证号码/手机号码/用户名" name="account">
        <t-input v-model="form.account" placeholder="请输入身份证号码/手机号码/用户名" />
      </t-form-item>
      <t-form-item label="个人用户密码" name="password">
        <t-input v-model="form.password" placeholder="请输入个人用户密码" type="password" />
      </t-form-item>
      <div class="text-center">
        <t-button type="submit">保存</t-button>
      </div>
    </t-form>
  </div>
</template>
