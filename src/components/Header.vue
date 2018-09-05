<template>
  <div class="header clearfix">
    <router-link to="/list" class="title"><p>MY-H5</p></router-link>
    <div class="centerBtn">
      <ul class="clearfix" v-if="$route.path !== '/list'">
        <li @click="addTextItem"><a href="javascript:;"><i class="iconfont icon-twenbenkuang"></i><span>文本</span></a></li>
        <li @click="showImgList"><a href="javascript:;"><i class="iconfont icon-tupian01"></i><span>图片</span></a></li>
        <!-- <li><a href="javascript:;"><i class="iconfont icon-liulanmoshi"></i><span>背景</span></a></li> -->
        <li @click="showPlayerList"><a href="javascript:;"><i class="iconfont icon-bofangsanjiaoxing"></i><span>音乐</span></a></li>
        <li><a href="javascript:;"><i class="iconfont icon-chakan"></i><span>预览</span></a></li>
        <li @click="save"><a href="javascript:;"><i class="iconfont icon-biaodanwancheng"></i><span>保存</span></a></li>
        <li @click="itemSet"><a href="javascript:;"><i class="iconfont icon-tuozhuaicaidandaohang"></i><span>设置</span></a></li>
      </ul>
    </div>
    <div class="user">
      <span class="username">欢迎，{{ username }}</span>
      <a href="/">退出</a>
    </div>
  </div>
</template>

<script>
import {
  mapMutations
} from 'vuex'

export default {
  computed: {
    username () {
      return this.$store.state.user.username
    }
  },

  methods: {
    ...mapMutations(['addTextItem']),
    showImgList () {
      this.$emit('showImgList')
    },
    showPlayerList () {
      this.$emit('showPlayerList')
    },
    itemSet () {
      this.$emit('showItemSet')
    },
    async save () {
      let username = this.$store.state.user.username
      let itemTitle = this.$store.state.curItem.title
      let pageList = this.$store.state.pageList
      let result = await this.$http({
        method: 'POST',
        url: 'http://localhost:3000/upload',
        data: {
          username,
          itemTitle,
          pageList
        }
      })
    },
  }
}
</script>

<style lang="scss">
.header {
  min-width: 768px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: #161F2A;
  display: flex;
  .title {
    display: inline-block;
    margin-left: 20px;
    height: 100%;
    font-size: 24px;
    color: #fff;
    font-weight: bold;
  }
  .centerBtn {
    display: inline-block;
    flex: 1;
    text-align: center;
    ul {
      display: flex;
      justify-content: center;
      i {
        font-size: 36px;
      }
      li {
        float: left;
        height: 60px;
        a {
          display: inline-block;
          position: relative;
          top: -10px;
          padding: 0 10px;
          height: 70px;
          color: #D7D8E3;
          span {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 24px;
            font-size: 16px;
            text-align: center;
            line-height: 24px;
          }
        }
      }
    }
  }
  .user {
    display: inline-block;
    margin-right: 20px;
    .username {
      margin-right: 10px;
      color: #fff;
      font-size: 18px;
    }
    a {
      display: inline-block;
      margin-left: 5px;
      padding: 0 15px;
      height: 32px;
      font-size: 16px;
      color: #fff;
      text-align: center;
      line-height: 32px;
      border-radius: 10px;
      background: #E7866E;
    }
  }
}
</style>

