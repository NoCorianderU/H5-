<template>
  <div class="imgList">
    <div class="mask" @click="closeImgList"></div>
    <div class="info">
      <p>图片库<a href="javascript:;" class="fr" @click="closeImgList"><i class="iconfont icon-X"></i></a></p>
      <ul>
        <li v-for="(item, index) in imgList" :key="index" :class="{'active': index === listIndex}" @click="changeFocus(index, item)">
          <div class="imgBox">
            <img :src="item.src" alt="">
          </div>
          <p>{{ item.name }}</p>
          <a href="javascript:;" @click="deleteImg(index)"><i class="iconfont icon-X"></i></a>
        </li>
      </ul>
      <div class="actions clearfix">
        <input type="file" @change="addImg" style="display: none" ref="uploadFile" multiple>
        <a href="javascript:;" class="fr" @click="closeImgList">取消</a>
        <a href="javascript:;" class="fr" @click="insertImg(curImg)">插入选中图片</a>
        <a href="javascript:;" class="fl" @click="uploadFile">上传本地图片</a>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'

export default {
  data () {
    return {
      title: '',
      listIndex: '',
      imgList: [

      ],
      curImg: {}
    }
  },
  methods: {
    ...mapMutations(['addImgItem']),
    closeImgList () {
      this.$emit('closeImg')
    },
    insertImg (item) {
      if (typeof this.listIndex == 'number') {
        this.addImgItem(item)
        this.closeImgList()
      }
    },
    changeFocus (index, item) {
      this.listIndex = index
      this.curImg = item
    },
    addImg (e) {
      let file = e.target.files;
      let _this = this
      for (let index in file) {
        let item = file[index]
        if (item.size) {
          let img = {
            name: item.name
          }
          let reader = new FileReader()
          reader.readAsDataURL(item)
          // reader.onprogress = function(){
          //     console.log('start');  //开始读取
          // };
          reader.onload= function (e) {
            img.src = this.result
            _this.imgList.push(img)
          }
        }
      }
    },
    deleteImg (index) {
      this.imgList.splice(index, 1)
    },
    uploadFile () {
      this.$refs.uploadFile.click()
    },
  },
  watch: {
    title () {
      this.error = false
    },
    imgList () {
      this.$nextTick()
    }
  }
}
</script>

<style lang="scss">

.imgList {
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
    top: 50%;
    left: 50%;
    margin-left: -350px;
    margin-top: -300px;
    width: 700px;
    height: 600px;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    z-index: 10;
    > p {
      padding: 0 15px;
      font-size: 22px;
      line-height: 48px;
      color: #424242;
      background: #ccc;
    }
    ul {
      box-sizing: border-box;
      padding: 20px 15px;
      width: 100%;
      height: 500px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      overflow: auto;
      li {
        position: relative;
        box-sizing: border-box;
        padding: 10px 10px 0;
        margin-bottom: 20px;
        float: left;
        width: 30%;
        height: 250px;
        box-shadow: 2px 2px 10px #ccc;
        border-radius: 4px;
        &:hover {
          a {
            display: block;
          }
        }
        a {
          display: inline-block;
          position: absolute;
          top: -8px;
          right: -8px;
          content: '';
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 4px #ccc;
          display: none;
          i {
            font-size: 12px;
            color: #424242;
          }
        }
        .imgBox {
          width: 100%;
          height: 90%;
          border: 1px solid #ccc;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          img {
            max-width: 100%;
            max-height: 80%;
          }
        }
        p {
          margin-top: 1px;
          font-size: 14px;
          text-align: center;
          line-height: 20px;
          text-overflow:ellipsis;
          overflow:hidden;
          white-space:nowrap;
        }
      }
      .active {
        box-shadow: 2px 2px 10px #FF6666;
      }
      &::after {
        content: "";
        width: 30%;
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
        padding: 0 10px;
        height: 32px;
        color: #fff;
        text-align: center;
        line-height: 32px;
        margin-left: 15px;
        border-radius: 8px;
        &:first-of-type {
          background: #E98670;
        }
        &:nth-of-type(2) {
          background: #A3A2DA;
        }
        &:last-of-type {
          background: #A3A2DA;
        }
      }
    }
  }
}
</style>
