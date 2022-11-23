<template>
  <div id="loginUser" class="login_div">
    <span class="login_span">用户登录</span>
    <el-divider></el-divider>
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <el-form-item prop="user">
        <el-input v-model="loginForm.user" placeholder="用户名"></el-input>
      </el-form-item>

      <el-form-item prop="pass">
        <el-input
          v-model="loginForm.pass"
          placeholder="密码"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-col :span="12">
          <el-input
            v-model="loginForm.vcode"
            maxlength="4"
            placeholder="验证码"
            style="width: 130px"
          ></el-input>
        </el-col>
        <el-col :span="12">
          <img
            id="code_img"
            :src="captchaUrl"
            @click="getCaptcha()"
            style="
              height: 40px;
              width: 100px;
              margin-left: 25px;
              cursor: pointer;
            "
            title="点击更换"
          />
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button
          v-on:keyup.enter.native="submitForm('loginForm')"
          type="primary"
          @click="submitForm('loginForm')"
          style="width: 250px"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 并列 -->
    <div class="setting-wrapper">
      <el-link
        type="primary"
        style="cursor: pointer"
        @click="toForgot"
        class="fogotCow"
        >忘记密码?</el-link
      >
      <el-link
        type="primary"
        style="cursor: pointer"
        @click="toRegister"
        class="registerCow"
        >用户注册</el-link
      >
    </div>
  </div>
</template>

<!-- 页面 -->
<style scoped>
/* .setting-wrapper {
  display: flex;
  flex-direction: row;
}
.forgotCow {
  margin: 0 150px 0 10px;
}
.registerCow {
  margin: 0 10px 0 120px;
} */
</style>

<script>
import { setCookie } from '../global/cookie';
import qs from 'qs';
// import md5 from "js-md5"
export default {
  data() {
    let validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        user: '',
        pass: '',
        vcode: '',
        photo: '',
      },
      rules: {
        user: [{ validator: validateUser, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
      },
      captchaUrl: 'http://localhost:3000/auth/login/yzm',
    };
  },

  methods: {
    getCaptcha() {
      let defaultUrl = 'http://localhost:3000/auth/login/yzm';
      // 每次指定的src要不一样，img才会重新请求，可以使用Date.now()小技巧
      this.captchaUrl = `${defaultUrl}?timer=${new Date().getTime()}`;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交表单
          this.$axios
            .post('auth/login/user', {
              name: this.loginForm.user,
              password: this.loginForm.pass,
              vcode: this.loginForm.vcode,
            })
            .then((result) => {
              if (result.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '登录成功!',
                });
                console.log(result);
                setCookie('token', result.data.datas.token, 1);
                // 跳转到student组件中
                this.$router.replace({ path: '/Stu1_1' });
              } else if (result.data.code === 2) {
                this.$message({
                  type: 'success',
                  message: '登录成功!',
                });
                setCookie('token', result.data.datas.token, 1);
                // 跳转到teacher组件中
                this.$router.replace({ path: '/Tea1_1' });
              } else {
                this.getCaptcha();
                alert(result.data.msg);
                return false;
              }
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          alert('用户名和密码不能为空');
          return false;
        }
      });
    },
    toForgot() {
      this.$router.push({
        name: 'forgot',
        query: {
          from: 'user',
        },
      });
    },
    toRegister() {
      this.$router.push({
        name: 'register',
        query: {
          from: 'user',
        },
      });
    },
  },
};
</script>
