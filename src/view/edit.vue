<template>
  <div class="editPage">
    <Header @showImgList="showImgList" @showPlayerList="showPlayList" @showItemSet="showItemSet"></Header>
    <Edit :title="title" :imgList="imgList" :playerList="playerList" :itemSet="itemSet" @closeImg="closeImgList" @closePlayer="closePlayerList" @closeItemSet="closeItemSet"></Edit>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Edit from "@/components/Edit"

export default {
  props: ['title'],
  data () {
    return {
      imgList: false,
      playerList: false,
      itemSet: false
    }
  },
  components: {
    Header,
    Edit
  },
  methods: {
    showImgList () {
      this.imgList = true
    },
    showPlayList () {
      this.playerList = true
    },
    closeImgList () {
      this.imgList = false
    },
    closePlayerList () {
      this.playerList = false
    },
    showItemSet () {
      this.itemSet = true
    },
    closeItemSet () {
      this.itemSet = false
    }
  },

  beforeRouteLeave (to, from, next) {
    next(confirm('确认不保存修改直接离开么？'));
  }
}
</script>

<style lang="scss">
.editPage {
  display: flex;
  flex-direction: column;
  user-select: none;
}
</style>
