<template>
  <div class="itemList">
    <div class="container">
      <h2>我的h5作品</h2>
      <ul class="clearfix">
        <li>
          <a href="javascript:;" @click="addItem"><i class="iconfont icon-hao"></i><span>创建新作品</span></a>
        </li>
        <li v-for="(item, index) in itemList" :key="index">
          <a href="javascript:;" @click="toEdit(item)">
            <div class="post">
              <img :src="item.post" alt="" v-if="item.post">
              <p v-else>暂无封面</p>
            </div>
            <p class="title">{{item.title}}</p>
          </a>
          <a href="javascript:;" class="itemEdit" @click="deleteItem(item.title, index)">删除此项目</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    itemList () {
      return this.$store.state.user.dbs
    }
  },

  methods: {
    addItem () {
      this.$emit('add')
    },
    toEdit (item) {
      this.$store.commit('editItem', item)
      this.$router.push(`/edit/${item.title}`)
    },
    deleteItem (title, index) {
      this.$store.commit('deleteItem', index)
      let username = this.$store.state.user.username
      this.$http({
        method: 'POST',
        url: 'http://localhost:3000/deleteItem',
        data: {
          username,
          title
        }
      })
    }
  }
}
</script>

<style lang="scss">
.itemList {
  padding-top: 20px;
  h2 {
    font-size: 32px;
    font-weight: normal;
    color: #424242;
    line-height: 50px;
    border-bottom: 2px solid #424242;
  }
  ul {
    padding: 20px 0;
    li {
      float: left;
      margin: 0 15px 40px;
      overflow: hidden;
      position: relative;
      &:first-child {
        a {
          span {
            bottom: 20%;
          }
        }
      }
      &:hover {
        a {
          .title {
            margin-top: -12px;
          }
        }
        .itemEdit {
          bottom: 0;
        }
      }
      a {
        display: inline-block;
        box-sizing: border-box;
        position: relative;
        width: 240px;
        height: 320px;
        color: #A4A2E3;
        text-align: center;
        background: #fff;
        i {
          display: inline-block;
          margin-top: 90px;
          font-size: 60px;
        }
        span {
          position: absolute;
          left: 0;
          bottom: 7%;
          width: 100%;
          font-size: 18px;
        }
        .post {
          margin: 20px auto;
          width: 90%;
          height: 75%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 0 4px #ccc;
          img {
            width: 100%;
          }
        }
        .title {
          font-size: 18px;
          transition: .3s;
        }
      }
      .itemEdit {
        position: absolute;
        left: 0;
        bottom: -30px;
        width: 100%;
        height: 30px;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 30px;
        background: rgba(170, 60, 46, 0.747);
        transition: .3s;
        z-index: 10;
      }
    }
  }
}
</style>
