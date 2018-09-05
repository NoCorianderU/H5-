<template>
  <div class="register">
    <div class="mask" @click="close"></div>
    <div class="info">
      <p class="header">注册<i class="iconfont icon-X fr" @click="close"></i></p>
      <div class="account">
        <section>
          <p>用户名</p>
          <input type="text" placeholder="请输入用户名" v-model="username" :class="[{'error': usernameError}, {'error': requireUsername}]">
          <span v-if="usernameError" class="animated shake">用户名已存在</span>
          <span v-if="requireUsername" class="animated shake">请输入用户名</span>
        </section>
        <section>
          <p>密码</p>
          <input type="password" placeholder="请输入密码" v-model="password" :class="[{'error': passwordError}, {'error': shortPassword}]">
          <span v-if="shortPassword" class="animated shake">密码长度至少为8位</span>
        </section>
        <section>
          <p>确认密码</p>
          <input type="password" placeholder="请再次输入密码" v-model="passwordConfirm" :class="{'error': passwordError}">
          <span v-if="passwordError" class="animated shake">两次输入密码不一致，请重新输入</span>
        </section>
        <section>
          <p>验证码</p>
          <div class="identifyCode">
            <input type="text" placeholder="请输入验证码" v-model="identifyCode" :class="{'error': identifyCodeError}">
            <span v-if="identifyCodeError" class="animated shake">验证码错误</span>
            <IdentifyCode/>
          </div>
        </section>
        <a href="javascript:;" class="toLogin fr">已有账号...</a>
        <a href="javascript:;" class="registerBtn" @click="register">注册</a>
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
      usernameError: false,
      requireUsername: false,
      rightUsername: false,
      password: '',
      shortPassword: false,
      passwordConfirm: '',
      passwordError: false,
      rightPassword: false,
      identifyCode: '',
      identifyCodeError: false,
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    async register () {
      if (this.rightUsername && this.rightPassword && !this.identifyCodeError) {
        let { data } = await this.$http({
          method: 'POST',
          url: 'http://localhost:3000/register',
          data: {
            username: this.username,
            password: this.password
          }
        })
        if (data.code == 0) {
          this.$store.commit('savaUserinfo', data.data.userinfo)
          this.$router.push('/list')
        }
        if (data.code == 1) {
          this.usernameError = true
        }
        this.$store.commit('uploadIdentifyCode')
        this.identifyCode = ''
      } else {
        if (!this.username.length) {
          this.requireUsername = true
        }
        if (!this.password.length) {
          this.shortPassword = true
        }
        if (!this.identifyCode.length) {
          this.identifyCodeError = true
        }
      }
    }
  },
  watch: {
    username () {
      this.rightUsername = true
      this.usernameError = false
      this.requireUsername = false
    },
    password (n) {
      if ( n.length < 8) {
        this.shortPassword = true
        this.rightPassword = false
      } else {
        this.shortPassword = false
        this.rightPassword = true
      }
    },
    passwordConfirm (n) {
      if ( n !== this.password) {
        this.passwordError = true
        this.rightPassword = false
      } else {
        this.passwordError = false
        this.rightPassword = true
      }
    },
    identifyCode (n) {
      if (n.length >= 4) {
        if (n !== this.$store.state.identifyCode) {
          this.identifyCodeError = true
        } else {
          this.identifyCodeError = false
        }
      }
    }
  }
}
</script>

<style lang="scss">
.register {
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
    top: 50%;
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
          transition: .2s;
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
      .toLogin {
        margin-top: 15px;
        color: #57626B;
        &:hover {
          color: #F25D8E;
        }
      }
      .registerBtn {
        margin-top: 50px;
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

