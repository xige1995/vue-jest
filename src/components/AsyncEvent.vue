<template>
    <div>
        <h1>
          异步行为监测
        </h1>
      <div>
        <button @click="buttonClick">点击增加</button>
        <span>{{value}}</span>
        <p>一秒后增加</p>
      </div>
      <div>
        <button class="mock" @click="buttonMock">点击Mock</button>
        <span id="mock">{{vlaueMock}}</span>
      </div>
    </div>
</template>
<script>
import { getMockValue } from '@/http/api.js'
export default {
  data () {
    return {
      value: 0,
      vlaueMock: ''
    }
  },
  methods: {
    buttonClick () {
      setTimeout(() => {
        this.value++
      }, 1000)
    },
    async buttonMock () {
      console.log('buttonMock click')
      const res = await getMockValue()
      this.vlaueMock = res.data
      return res
    }
  }
}
</script>
