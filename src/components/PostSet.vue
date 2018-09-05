<template>
    <div class="postSet">
      <div class="mask" @click="close"></div>
      <div class="postBox fr">
        <p class="title">全局设置</p>
        <div class="postImg">
          <p v-if="!post">暂无封面</p>
          <img :src="post" alt="" v-else>
        </div>
        <input type="file" @change="addImg" style="display: none" ref="uploadFile">
        <a href="javascript:;" class="uploadPost" @click="uploadImg">上传封面</a>
        <p class="setTitle">设置标题</p>
        <input type="text" v-model="title">
        <a href="javascript:;" class="uploadPost" @click="updateItem">保存</a>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      titleB: ''
    }
  },
  computed: {
    post () {
      return this.$store.state.curItem.post
    }
  },
  methods: {
    close () {
      this.$emit('closeItemSet')
    },
    uploadImg () {
      this.$refs.uploadFile.click()
    },
    addImg (e) {
      let file = e.target.files[0];
      let _this = this
      if (file.size) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        // reader.onprogress = function(){
        //     console.log('start');  //开始读取
        // };
        reader.onload= function (e) {
          // _this.imgList.push(img)
          _this.$store.commit('uploadPost', this.result)
        }
      }
    },
    async updateItem () {
      let username = this.$store.state.user.username
      let title = this.titleB
      let newTitle = this.title
      let post = this.$store.state.curItem.post
      let { data } = await this.$http({
        method: 'POST',
        url: 'http://localhost:3000/updateItem',
        data: {
          username,
          title,
          newTitle,
          post,
        }
      })
      if (data.code === 15) {
        this.close()
      }
    }
  },
  watch: {
    title (n) {
      this.$store.commit('updateCurItem', n)
    }
  },
  mounted () {
    this.title = this.$store.state.curItem.title
    this.titleB = this.$store.state.curItem.title
  }
}
</script>

<style lang="scss">
.postSet {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  .mask {
    flex: 1;
    height: 100%;
    background: rgba($color: #000, $alpha: 0.7);
  }
  .postBox {
    box-sizing: border-box;
    width: 400px;
    height: 100%;
    background: #fff;
    .title {
      color: #fff;
      font-size: 18px;
      line-height: 40px;
      text-align: center;
      background: #A4A2DA;
    }
    .postImg {
      margin: 50px auto 30px;
      width: 80%;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0 12px #ccc;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    a {
      display: block;
    }
    .uploadPost {
      margin: 0 auto;
      width: 120px;
      height: 40px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 40px;
      border-radius: 20px;
      background: #A4A2DA;
    }
    .setTitle {
      margin-top: 30px;
      font-size: 20px;
      text-align: center;
    }
    input {
      display: block;
      margin: 30px auto;
      padding: 0 15px;
      width: 40%;
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      border: 1px solid #ccc;
    }
  }
}
</style>
