<template>
  <div @click="refreshCode">
    <Identify :identifyCode="identifyCode"></Identify>
  </div>
</template>

<script>
import Identify from '@/components/Identify'

export default {
  components: {
    Identify
  },
  mounted() {
      this.$store.commit('uploadIdentifyCode')
  },
  computed: {
    identifyCode () {
      return this.$store.state.identifyCode
    }
  },
  methods: {
    refreshCode() {
      this.$store.commit('uploadIdentifyCode')
    }
  }
}
</script>

<style>

</style>
