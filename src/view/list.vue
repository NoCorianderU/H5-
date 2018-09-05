<template>
  <div class="userItem">
    <Header/>
    <Item @add="add"></Item>
    <transition name="fadeIn">
      <Tip v-if="tip" @closeTip="closeTip"></Tip>
    </transition>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Item from '@/components/Item.vue'
import Tip from '@/components/Tip.vue'

export default {
  data () {
    return {
      tip: false
    }
  },
  components: {
    Header,
    Item,
    Tip
  },
  methods: {
    closeTip () {
      this.tip = false
    },
    add () {
      this.tip = true
    }
  }
}
</script>

<style lang="scss">
.fadeIn-enter-active, .fadeIn-leave-active {
  transition: all .2s;
}
.fadeIn-enter, .fadeIn-leave-to {
  opacity: 0;
}
</style>
