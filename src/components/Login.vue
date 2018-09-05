<template>
  <div class="login">
    <div class="mask" @click="close"></div>
    <div class="info">
      <p class="header">登陆<i class="iconfont icon-X fr" @click="close"></i></p>
      <div class="account">
        <section>
          <p>用户名</p>
          <input type="text" placeholder="请输入用户名" :class="{'error': error}" v-model="username">
          <span v-if="error" class="animated shake">用户名错误</span>
        </section>
        <section>
          <p>密码</p>
          <input type="password" placeholder="请输入密码" :class="{'error': error}" v-model="password">
          <span v-if="error" class="animated shake">密码错误</span>
        </section>
        <section>
          <p>验证码</p>
          <div class="identifyCode">
            <input type="text" placeholder="请输入验证码" v-model="identifyCode" :class="{'error': identifyCodeError}">
            <span v-if="identifyCodeError" class="animated shake">验证码错误</span>
            <IdentifyCode/>
          </div>
        </section>
        <label><input type="checkbox" v-model="remember">记住密码</label>
        <label><input type="checkbox" v-model="setCookie">一周免登陆</label>
        <a href="javascript:;" class="toRegister fr">前去注册...</a>
        <a href="javascript:;" class="loginBtn" @click="login">登陆</a>
      </div>
    </div>
  </div>
</template>

<script>
import IdentifyCode from '@/components/IdentifyCode.vue'

export default {
  components: {
    IdentifyCode
  },
  data () {
    return {
      username: '',
      password: '',
      error: false,
      identifyCode: '',
      identifyCodeError: false,
      remember: false,
      setCookie: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    async login () {
      if (!this.error && !this.identifyCodeError) {
        let { data } = await this.$http({
          method: 'POST',
          url: 'http://localhost:3000/login',
          data: {
            username: this.username,
            password: this.password
          }
        })
        if (data.code == 11) {
          this.$store.commit('savaUserinfo', data.data.userinfo)
          this.$router.push('/list')
        }
        if (data.code == 12 || data.code == 14) {
         this.error = true
        }
        this.$store.commit('uploadIdentifyCode')
        this.identifyCode = ''
      } else {
        if (!this.username.length || !this.password.length) {
          this.error = true
        }
        if (!this.identifyCode.length) {
          this.identifyCodeError = true
        }
      }
    }
  },
  watch: {
    identifyCode () {
      if (this.identifyCode.length >= 4) {
        if (this.identifyCode != this.$store.state.identifyCode) {
          this.identifyCodeError = true
        } else {
          this.identifyCodeError = false
        }
      }
    },
    username () {
      this.error = false
    },
    password () {
      this.error = false
    }
  }
}
</script>

<style lang="scss">
.login {
  position: absolute;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  z-index: 100;
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
    top: 55%;
    left: 50%;
    margin-left: -250px;
    margin-top: -300px;
    width: 500px;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    z-index: 10;
    .header {
      box-sizing: border-box;
      padding: 0 15px;
      height: 50px;
      font-size: 24px;
      color: #57626B;
      font-weight: bold;
      line-height: 50px;
      background: #E5E4E5;
      i {
        cursor: pointer;
      }
    }
    .account {
      box-sizing: border-box;
      padding: 30px 70px 40px;
      section {
        position: relative;
        margin-bottom: 5px;
        p {
          font-size: 16px;
          line-height: 36px;
          color: #57626B;
        }
        input {
          box-sizing: border-box;
          padding-left: 15px;
          width: 100%;
          height: 40px;
          line-height: 38px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          border-color: red;
        }
        span {
          position: absolute;
          right: 0;
          bottom: -18x;
          color: red;
        }
        .identifyCode {
          display: flex;
          padding-right: 30px;
          input {
            flex: 1;
            margin-right: 50px;
          }
          span {
            left: 0;
            bottom: -20px;
          }
        }
      }
      label {
        display: inline-block;
        margin-top: 16px;
        margin-right: 30px;
        input {
          vertical-align: top;
          margin-top: 2px;
          margin-right: 5px;
        }
      }
      .toRegister {
        margin-top: 15px;
        color: #57626B;
        &:hover {
          color: #F25D8E;
        }
      }
      .loginBtn {
        margin-top: 20px;
        display: block;
        height: 40px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        border-radius: 4px;
        background: #4DAFEE;
        transition: .2s;
        &:hover {
          background: #00BEE7;
        }
      }
    }
  }
}
</style>

