<template>
  <div class="editSection clearfix">
    <div class="pageList fl">
      <h4>页面列表</h4>
      <ul>
        <li v-for="(key, index) in pageList" :key="index" @click="playAnimate();changePage(index)"><a href="javascript:;" :class="{'active': pageIndex === index}">第{{ index+1 }}页<i class="iconfont icon-X fr" @click.stop="deletePage(index)"></i></a></li>
      </ul>
      <a href="javscript:;" class="addPage" @click="addPage">+ 添加新一页</a>
    </div>
    <div class="pageShow fl">
      <div class="pageEdit">
        <div class="moblie">
          <ul class="clearfix">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <span class="middleBlock"></span>
          <span class="battery"><i class="iconfont icon-dianchi"></i></span>
          <p>{{ title }}</p>
        </div>
        <div class="player">
          <audio src="../assets/audio/1.mp3" autoplay="autoplay"></audio>
        </div>
        <a href="javascript:;" class="playAnimate" @click="playAnimate"><i class="iconfont icon-bofang"></i><span>播放动画</span></a>
        <div :class="['itemPut', {'showAnimate': playAnimate}]" v-if="pageList.length">
          <span v-for="(item, index) in pageList[pageIndex][0]" :key="index" :style="item.style" :class="[{'active': itemIndex === index}, {'show': showAnim == true}, 'animated', item.style.animationClass]" @mousedown="showSetting();changeItemType(0);changeItemIndex(index);changeTextStyle(item);drag(item.style, $event)">{{ item.content }}</span>
          <img v-for="(img, index) in pageList[pageIndex][1]" :key="`${img.name}${index}`" :src="img.src" :class="[{'show': showAnim == true}, 'animated', img.style.animationClass]" :style="img.style" @mousedown="showSetting();changeItemType(1);changeItemIndex(index);changeImgStyle(img);drag(img.style, $event)">
        </div>
      </div>
    </div>
    <transition name="sildeIn">
      <div class="pageItemSet fr" v-if="showSetMenu">
        <h4>属性设置</h4>
        <p>元素id: {{ itemType + '-' + itemIndex }}</p>
        <div class="itemStyle">
          <a href="javascript:;" :class="{'active': index === 0}" @click="changeIndex(0)">样式</a>
          <a href="javascript:;" :class="{'active': index === 1}" @click="changeIndex(1)">动画</a>
        </div>
        <div v-if="index === 0">
          <ul class="styleSettings" v-if="itemType === 0">
            <li>文字样式</li>
            <li><span>字体颜色</span><input type="color" v-model="textStyle.color"><input type="text" v-model="textStyle.color"></li>
            <li><span>文字大小</span><input type="range" v-model.number="textStyle.fontSize" min="12" max="42" step="2"><input type="text" v-model="textStyle.fontSize"></li>
            <li><span>透明度</span><input type="range" v-model="textStyle.opacity" min="0" max="1" step="0.1"><input type="text" v-model="textStyle.opacity"></li>
            <li><span>文字内容  </span><input type="text" v-model="textStyle.content"></li>
          </ul>
          <ul class="styleSettings"  v-if="itemType === 1">
            <li>图片样式</li>
            <li><span>宽度</span><input type="range" class="rangInput" v-model="imgStyle.width" min="1" max="600" step="1"><input type="text" v-model="imgStyle.width"></li>
            <li><span>高度</span><input type="range" class="rangInput" v-model="imgStyle.height" min="1" max="600" step="1"><input type="text" v-model="imgStyle.height"></li>
            <li><span>透明度</span><input type="range" class="rangInput" v-model="imgStyle.opacity" min="0" max="1" step="0.1"><input type="text" v-model="imgStyle.opacity"></li>
          </ul>
        </div>
        <ul class="styleSettings" v-if="index === 1">
          <li>动画样式</li>
          <li>
            <span>动画名称</span>
            <select v-model="animate.animationClass">
              <option value="none">请选择动画效果</option>
              <optgroup label="Swedish Cars">
                <option value="bounce">Bounce</option>
                <option value="flash">Flash</option>
              </optgroup>
              <optgroup label="German Cars">
                <option value="shake">Shake</option>
                <option value="swing">Swing</option>
                <option value="zoomIn">ZoomIn</option>
              </optgroup>
            </select>
          </li>
          <li><span>动画时长</span><input type="range" v-model="animate.animationDuration" min="0.1" max="3" step="0.1"><input type="text" v-model="animate.animationDuration"></li>
          <li><span>动画延迟</span><input type="range" v-model="animate.animationDelay" min="0" max="5" step="0.1"><input type="text" v-model="animate.animationDelay"></li>
          <li><span>动画次数</span><input type="range" v-model="animate.animationIterationCount" min="1" max="10" step="1"><input type="text" v-model="animate.animationIterationCount" :disabled="animate.loop"></li>
          <li><span>循环播放</span><input type="checkbox" v-model="animate.loop"></li>
        </ul>
      </div>
    </transition>
    <transition name="fadeIn">
      <PlayerList v-if="playerList" @closePlayer="closePlayerList"></PlayerList>
    </transition>
    <transition name="fadeIn">
      <ImgList v-if="imgList" @closeImg="closeImgList"></ImgList>
    </transition>
    <transition name="fadeIn">
      <PostSet v-if="itemSet" @closeItemSet="closeItemSet"></PostSet>
    </transition>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'

import ImgList from '@/components/ImgList'
import PlayerList from '@/components/PlayerList'
import PostSet from '@/components/PostSet'

export default {
  props: ['title', 'imgList', 'playerList', 'itemSet'],
  components: {
    ImgList,
    PlayerList,
    PostSet
  },
  data () {
    return {
      index: 0,
      showSetMenu: false,
      showAnim: false,
      itemType: 0,
      itemIndex: 0,
      textStyle: {
        color: '#000000'
      },
      imgStyle: {

      },
      animate: {

      }
    }
  },
  computed: {
    ...mapState([
      'pageIndex',
      'pageList'
    ])
  },
  methods: {
    ...mapMutations([
      'changePage',
      'addPage',
      'deletePage'
    ]),
    playAnimate () {
      this.showAnim = true
      window.setTimeout(() => {
        this.showAnim = false
      }, 20)
    },
    closeImgList () {
      this.$emit('closeImg')
    },
    closePlayerList () {
      this.$emit('closePlayer')
    },
    closeItemSet () {
      this.$emit('closeItemSet')
    },
    changeIndex (index) {
      this.index = index
    },
    showSetting () {
      this.showSetMenu = true
    },
    changeItemType (index) {
      this.itemType = index
    },
    changeItemIndex (index) {
      this.itemIndex = index
    },
    drag (itemStyle, e) {
      e.preventDefault();
      let x = e.clientX - parseInt(itemStyle.left)
      let y = e.clientY - parseInt(itemStyle.top)
      let xMax = 350 - e.target.offsetWidth
      let yMax = 550 - e.target.offsetHeight
      let _this = this
      document.onmousemove = (e) => {
        let xMove = e.clientX - x
        let yMove = e.clientY - y
        if (xMove <= 0) {
          xMove = 0
        }
        if (xMove >= xMax) {
          xMove = xMax
        }
        if (yMove <= 0) {
          yMove = 0
        }
        if (yMove >= yMax) {
          yMove = yMax
        }
        _this.set(itemStyle, xMove, yMove)
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
      }
    },
    set (itemStyle, x, y) {
      itemStyle.left = x + 'px'
      itemStyle.top = y+ 'px'
    },
    changeTextStyle (item) {
      this.textStyle = {
        content: item.content,
        color: item.style.color,
        fontSize: parseInt(item.style.fontSize),
        top: parseInt(item.style.top),
        left: parseInt(item.style.left),
        opacity: item.style.opacity
      }
      this.animate = {
        animationClass: item.style.animationClass,
        animationDuration: parseFloat(item.style.animationDuration),
        animationDelay: parseFloat(item.style.animationDelay),
        animationIterationCount: isNaN(item.style.animationIterationCount) ? '' : item.style.animationIterationCount,
        loop: isNaN(item.style.animationIterationCount)
      }
    },
    changeImgStyle (item) {
      this.imgStyle = {
        width: parseInt(item.style.width),
        height: parseInt(item.style.height),
        top: parseInt(item.style.top),
        left: parseInt(item.style.left),
        opacity: item.style.opacity
      }
      this.animate = {
        animationName: item.style.animationName,
        animationDuration: parseFloat(item.style.animationDuration),
        animationDelay: parseFloat(item.style.animationDelay),
        animationIterationCount: item.style.animationIterationCount == 'infinite' ? 0 : item.style.animationIterationCount,
        loop: item.style.animationIterationCount == 'infinite' ? true : false,
      }
    }
  },
  watch: {
    textStyle: {
      handler (n) {
        if (!this.pageList.length) {
          return
        }
        let item = this.pageList[this.pageIndex][this.itemType][this.itemIndex]
        item.content = n.content
        item.style.color = n.color
        item.style.fontSize = n.fontSize + 'px'
        item.style.opacity = n.opacity
      },
      deep: true
    },
    imgStyle: {
      handler (n) {
        if (!this.pageList.length) {
          return
        }
        let item = this.pageList[this.pageIndex][this.itemType][this.itemIndex]
        item.style.width = n.width + 'px'
        item.style.height = n.height + 'px'
        item.style.opacity = n.opacity
      },
      deep: true
    },
    animate: {
      handler (n) {
        if (!this.pageList.length) {
          return
        }
        let item = this.pageList[this.pageIndex][this.itemType][this.itemIndex]
        item.style.animationClass = n.animationClass
        item.style.animationDuration = n.animationDuration + 's'
        item.style.animationDelay = n.animationDelay + 's'
        item.style.animationIterationCount = n.loop ? 'infinite' : n.animationIterationCount
      },
      deep: true
    },
  },
}
</script>

<style lang="scss">
.sildeIn-enter-active, .sildeIn-leave-active {
  transition: all .5s;
}
.sildeIn-enter, .sildeIn-leave-to {
  transform: translateX(365px)
}

.fadeIn-enter-active, .fadeIn-leave-active {
  transition: all .5s;
}
.fadeIn-enter, .fadeIn-leave-to {
  opacity: 0;
}

.editSection {
  display: flex;
  padding-bottom: 100px;
  overflow: hidden;
  .pageList {
    position: relative;
    width: 300px;
    height: 600px;
    background: #fff;
    display: flex;
    flex-direction: column;
    h4 {
      height: 42px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      line-height: 42px;
      background: #A4A2DA;
    }
    ul {
      flex: 1;
      box-sizing: border-box;
      width: 100%;
      overflow: auto;
      padding: 20px;
      li {
        box-sizing: border-box;
        position: relative;
        margin-bottom: 10px;
        width: 100%;
        cursor: default;
        .active {
          background: #A4A2DA;
        }
        a {
          display: inline-block;
          width: 100%;
          height: 40px;
          color: #fff;
          font-size: 16px;
          text-align: center;
          line-height: 40px;
          background: #ccc;
          border-radius: 4px;
          i {
            position: absolute;
            right: 15px;
            bottom: 0;
            color: #fff;
            &:hover {
              color: #ccc;
            }
          }
        }
      }
    }
    .addPage {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 42px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      line-height: 42px;
      background: #454E5D;
    }
  }
  .pageShow {
    flex: 1;
    text-align: center;
    margin-right: 365px;
    .pageEdit {
      position: relative;
      margin: 100px auto;
      width: 350px;
      height: 100%;
      background: #fff;
      display: flex;
      flex-direction: column;
      .moblie {
        position: relative;
        height: 50px;
        background: #3D3C3E;
        ul {
          padding: 5px;
          li {
            float: left;
            margin-right: 2px;
            width: 6px;
            height: 6px;
            border-radius: 3px;
            background: #fff;
          }
        }
        .middleBlock {
          display: inline-block;
          position: absolute;
          top: 4px;
          left: 50%;
          margin-left: -14px;
          width: 27px;
          height: 9px;
          border-radius: 3px;
          background: #605F60;
        }
        .battery {
          position: absolute;
          top: -2px;
          right: 6px;
          i {
            color: #fff;
            font-size: 20px;
          }
        }
        p {
          margin-top: 6px;
          font-size: 14px;
          color: #fff;
        }
      }
      .playAnimate {
        position: absolute;
        top: 3%;
        right: -16%;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        &:hover {
          span {
            visibility: visible;
            transform: translateY(-5px);
            opacity: 1;
          }
        }
        i {
          font-size: 30px;
          color: #424242;
        }
        span {
          position: absolute;
          top: -25px;
          right: -30px;
          padding: 0 5px;
          height: 24px;
          line-height: 24px;
          color: #fff;
          background: rgba(0, 0, 0, .5);
          text-align: center;
          border-radius: 4px;
          visibility: hidden;
          opacity: 0;
          transition: all .5s;
        }
      }
      .itemPut {
        text-align: left;
        position: relative;
        flex: 1;
        background: url('../assets/images/bg.jpg');
        overflow: hidden;
        display: none;
        span {
          box-sizing: border-box;
          position: absolute;
          padding:  5px 10px;
          border: 1px dashed transparent;
          cursor: move;
        }
        img {
          position: absolute;
          max-width: 100%;
          max-height: 100%;
          cursor: move;
        }
        .active {
          border-radius: 4px;
          border: 1px dashed #000;
        }
        .show {
          display: none;
        }
      }
      .showAnimate {
        display: block;
      }
    }
  }
  .pageItemSet {
    position: relative;
    width: 365px;
    height: 600px;
    background: #fff;
    display: flex;
    flex-direction: column;
    margin-left: -365px;
    h4 {
      height: 42px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      line-height: 42px;
      background: #A4A2DA;
    }
    p {
      height: 45px;
      font-size: 18px;
      text-align: center;
      line-height: 45px;
    }
    .itemStyle {
      padding: 0 30px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      a {
        display: inline-block;
        width: 145px;
        height: 42px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        line-height: 42px;
        border-radius: 4px;
        background: #ccc;
      }
      .active {
        background: #A4A2DA;
      }
    }
    .styleSettings {
      li {
        box-sizing: border-box;
        width: 100%;
        padding: 0 20px;
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #ccc;
        &:first-child {
          color: #fff;
          font-size: 16px;
          background: #A4A2DA;
        }
        span {
          display: inline-block;
          width: 80px;
          font-size: 14px;
        }
        input[type="text"] {
          box-sizing: border-box;
          padding-left: 8px;
          height: 24px;
          line-height: 24px;
          border: 1px solid #ccc;
        }
        input[type="color"] {
          vertical-align: top;
          margin-top: 11px;
          margin-right: 15px;
        }
        input[type="color"] + input[type="text"] {
          width: 72px;
        }
        input[type="range"] {
          vertical-align: top;
          margin-top: 12px;
          margin-right: 15px;
          width: 80px;
        }
        input[type="range"] + input[type="text"] {
          width: 40px;
        }
      }
    }
  }
}
</style>
