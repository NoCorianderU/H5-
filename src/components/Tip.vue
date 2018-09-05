<template>
  <div class="tips">
    <div class="mask" @click="close"></div>
    <div class="info">
      <p>创建作品<a href="javascript:;" class="fr" @click="close"><i class="iconfont icon-X"></i></a></p>
      <div class="itemTitle">
        <input type="text" v-model="title">
        <span v-if="error">标题不能为空</span>
        <span v-if="repeatError">标题已存在，请重新输入</span>
      </div>
      <div class="actions clearfix">
        <a href="javascript:;" class="fr" @click="close">取消</a>
        <a href="javascript:;" class="fr" @click="toEdit(title)">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      error: false,
      repeatError: false
    }
  },
  methods: {
    close () {
      this.$emit('closeTip')
    },
    async toEdit (title) {
      if (!this.title.length) {
        return this.error = true;
      }
      let username = this.$store.state.user.username
      let { data } = await this.$http({
        method: 'POST',
        url: 'http://localhost:3000/addItem',
        data: {
          username,
          title,
        }
      })
      if (data.code === 12) {
        this.$store.commit('addItem', title)
        this.close()
      } else {
        this.repeatError = true
      }
    }
  },
  watch: {
    title () {
      this.error = false
      this.repeatError = false
    }
  }
}
</script>

<style lang="scss">
@keyframes textShow {
  0% {
    transform: translateX(20px)
  }
  33% {
    transform: none
  }
  66% {
    transform: translateX(10px)
  }
  100% {
    transform: none
  }
}

.tips {
  position: absolute;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    z-index: 1;
  }
  .info {
    position: relative;
    top: 40%;
    left: 50%;
    margin-left: -260px;
    margin-top: -130px;
    width: 520px;
    height: 260px;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    z-index: 10;
    p {
      padding: 0 15px;
      font-size: 22px;
      line-height: 48px;
      color: #424242;
      background: #ccc;
    }
    .itemTitle {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -21px;
      margin-left: -170px;
      input {
        box-sizing: border-box;
        padding-left: 10px;
        width: 340px;
        height: 42px;
        font-size: 16px;
        line-height: 42px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      span {
        position: absolute;
        left: 0;
        bottom: -20px;
        color: red;
        font-size: 14px;
        line-height: 1;
        animation: textShow .3s forwards;
      }
    }
    .actions {
      box-sizing: border-box;
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 0 15px;
      width: 100%;
      height: 42px;
      border-top: 1px solid #ccc;
      a {
        margin-top: 5px;
        width: 60px;
        height: 32px;
        color: #fff;
        text-align: center;
        line-height: 32px;
        margin-left: 15px;
        border-radius: 8px;
        &:first-child {
          background: #E98670;
        }
        &:last-child {
          background: #A3A2DA;
        }
      }
    }
  }
}
</style>
