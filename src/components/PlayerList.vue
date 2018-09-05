<template>
  <div class="musicList">
    <div class="mask" @click="closePlayerList"></div>
    <div class="info">
      <p>歌曲库<a href="javascript:;" class="fr" @click="closePlayerList"><i class="iconfont icon-X"></i></a></p>
      <ul>
        <li v-for="(audio, index) in audios" :key="index">
          <span>{{ audio.name }}</span>
          <a href="javascript:;" @click="deleteCurAudio(index)">删除</a>
          <a href="javascript:;" @click="playCurAudio(audio)">播放</a>
        </li>
      </ul>
      <transition name="slideBottom">
        <div class="player" v-if="curSong">
          <p>
            当前播放歌曲：{{ curSong.name }}
            <a href="javascript:;" class="fr">插入当前歌曲</a>
            <a href="javascript:;" @click="check" class="fr" v-if="!playState">暂停</a>
            <a href="javascript:;" @click="check" class="fr" v-if="playState">播放</a>
            </p>
          <!-- <audio ref="player" autoplay="autoplay">
            <source :src="curSong.src" type="audio/mpeg">
          </audio> -->
        </div>
      </transition>
      <div class="actions clearfix">
        <input type="file" @change="addImg" style="display: none" ref="uploadFile" multiple>
        <a href="javascript:;" class="fr" @click="closePlayerList">取消</a>
        <a href="javascript:;" class="fl" @click="uploadFile">上传本地音乐</a>
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
      listIndex: '',
      audios: [

      ],
      curSong: '',
      playState: false
    }
  },
  methods: {
    ...mapMutations(['addImgItem']),
    closePlayerList () {
      this.$emit('closePlayer')
    },
    addImg (e) {
      let file = e.target.files;
      let _this = this
      for (let index in file) {
        let item = file[index]
        if (item.size) {
          let name = item.name.replace(/.mp3/, '')
          // let src = window.URL.createObjectURL(item)
          let audio = {
            name
          }
          // this.audios.push(audio)
          let reader = new FileReader()
          reader.readAsDataURL(item)
          // reader.onprogress = function(){
          //     console.log('start');  //开始读取
          // };
          reader.onload= function (e) {
            audio.src = this.result
            _this.audios.push(audio)
          }
        }
      }
    },
    playCurAudio (item) {
      this.curSong = item
      this.$refs.player.load()
      this.playState = true
    },
    deleteCurAudio (index) {
      this.audios.splice(index, 1)
    },
    uploadFile () {
      this.$refs.uploadFile.click()
    },
    check () {
      console.log(this.$refs.player.played)
    }
  }
}
</script>

<style lang="scss">

.slideBottom-enter-active, .slideBottom-leave-active {
  transition: all .5s;
}
.slideBottom-enter, .slideBottom-leave-to  {
  transform: translateY(48px)
}

.musicList {
  position: absolute;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  overflow: hidden;
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
    height: 500px;
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
      padding-top: 20px;
      width: 100%;
      height: 500px;
      li {
        box-sizing: border-box;
        padding: 0 40px;
        height: 40px;
        line-height: 40px;
        color: #424242;
        font-size: 18px;
        a {
          float: right;
          margin-left: 15px;
          &:hover {
            color: red;
          }
        }
      }
    }
    .player {
      box-sizing: border-box;
      position: absolute;
      left: 0;
      bottom: 50px;
      padding: 0 40px;
      width: 100%;
      height: 48px;
      line-height: 48px;
      color: #424242;
      background: #ccc;
      font-size: 18px;
      transition: .5s;
      p {
        a {
          margin-top: 9px;
          margin-left: 15px;
          color: #fff;
          font-size: 14px;
          line-height: 30px;
          padding: 0 5px;
          border-radius: 8px;
          background: #E98670;
          &:first-of-type {
            background: #A3A2DA;
          }
        }
      }
    }
    .actions {
      box-sizing: border-box;
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 0 15px;
      width: 100%;
      height: 50px;
      background: #fff;
      border-top: 1px solid #ccc;
      a {
        margin-top: 9px;
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
        &:last-of-type {
          background: #A3A2DA;
        }
      }
    }
  }
}
</style>
