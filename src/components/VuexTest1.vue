<template>
  <div class="text-align-center">
    <div>
      <input type="text" @input="actionInputIfTrue" />
      <button @click="actionClick()">Click</button>
    </div>
    <div>
      <p v-if="inputValue">{{inputValue}}</p>
      <p v-if="clicks">{{clicks}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: mapGetters(['clicks', 'inputValue']),
  methods: {
    ...mapActions(['actionClick']),
    actionInputIfTrue: function actionInputIfTrue (event) {
      const inputValue = event.target.value
      if (inputValue === 'input') {
        this.$store.dispatch('actionInput', { inputValue })
      }
    }
  }
}
</script>
