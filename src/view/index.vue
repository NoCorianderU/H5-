<template>
  <div class="index">
    <div class="top clearfix">
      <div class="logo fl">
        <a href="javascript:;">H5</a>
      </div>
      <h1>HTML5可视化编辑器</h1>
      <div class="loginBtn fr">
        <a href="javascript:;" @click="login">登陆</a>
        <a href="javascript:;" @click="register">注册</a>
      </div>
    </div>
    <ul class="banner">
      <transition-group name="fade">
        <li class="slider1" :style="{ height: innerHeight + 'px' }" :key="1" v-if="index === 0">
          <div>
            <h2>可视化制作H5</h2>
            <p>创作如此简单</p>
          </div>
        </li>
        <li class="slider2" :style="{ height: innerHeight + 'px' }" :key="2" v-if="index === 1">
          <div>
            <h2>挖掘你的想象力</h2>
            <p>与世界分享你的作品</p>
          </div>
        </li>
      </transition-group>
    </ul>
    <transition-group name="fadeIn">
      <Login v-if="loginState" @close="closeLogin" key="login"></Login>
      <Register v-if="registerState" @close="closeRegister" key="register"></Register>
    </transition-group>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'

export default {
  components: {
    Login,
    Register
  },
  data () {
    return {
      innerHeight: '',
      index: 0,
      loginState: false,
      registerState: false
    }
  },
  methods: {
    login () {
      this.loginState = true
    },
    closeLogin () {
      this.loginState = false
    },
    register () {
      this.registerState = true
    },
    closeRegister () {
      this.registerState = false
    }
  },
  mounted () {
    this.innerHeight = window.innerHeight
    let _this = this
    window.onresize = () => {
      _this.innerHeight = window.innerHeight
    }
    setInterval( () => {
      this.index ++
      if (this.index === 2) {
        this.index = 0
      }
    }, 6000)
  }
}
</script>

<style lang="scss">
.fadeIn-enter-active, .fadeIn-leave-active {
  transition: all .5s;
}
.fadeIn-enter, .fadeIn-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter {
  transform: translateY(100%)
}
 .fade-leave-to {
  transform: translateY(-100%)
 }

@keyframes fadeIn {
  from {
    transform: none;
    opacity: 0;
  }
  to {
    transform: translateY(-15%);
    opacity: 1;
  }
}

.index {
  user-select: none;
  .top {
    position: relative;
    min-width: 768px;
    height: 60px;
    line-height: 60px;
    display: flex;
    transition: .5s;
    z-index: 100;
    &:hover {
      background: rgba(0, 0, 0, .7);
    }
    .logo {
      margin-left: 15px;
      font-size: 32px;
      font-weight: bold;
      a {
        color: #fff;
      }
    }
    h1 {
      flex: 1;
      color: #fff;
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      transition: .5s;
    }
    .loginBtn {
      margin-right: 15px;
      a {
        display: inline-block;
        box-sizing: border-box;
        margin-left: 5px;
        padding: 0 15px;
        height: 32px;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 32px;
        border-radius: 10px;
        &:hover {
          border: 1px solid #fff;
        }
        &:first-child {
          &:hover {
            margin-left: 4px;
            margin-right: -1px;
          }
        }
        &:last-child {
          &:hover {
            margin-right: -1px;
            margin-left: 4px;
          }
        }
      }
    }
  }
  .banner {
    position: relative;
    top: -60px;
    left: 0;
    li {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      div {
        position: absolute;
        top: 65%;
        left: 10%;
        color: #fff;
        opacity: 0;
        animation: fadeIn 0.5s 1s forwards;
        h2 {
          font-size: 48px;
        }
        p {
          margin-top: 30px;
          font-size: 24px;
        }
      }
    }
    .slider1 {
      background: url('../assets/images/s1.jpg') no-repeat center / cover;
    }
    .slider2 {
      background: url('../assets/images/s2.jpg') no-repeat center / cover;
    }
  }
}
</style>
