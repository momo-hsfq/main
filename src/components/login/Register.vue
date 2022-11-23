<template>
  <div id="register" class="register_div">
    <span class="register_span">用户注册</span>
    <el-divider></el-divider>
    <el-form :model="userForm" :rules="rules" ref="userForm" label-width="70px">
      <el-form-item prop="user" label="用户名" placeholder="请输入用户名">
        <el-input v-model="userForm.user"></el-input>
      </el-form-item>
      <!-- 注册时输入邮箱 -->
      <!-- <el-form-item prop="email" label="邮箱">
          <el-input v-model="emailForm.user"></el-input>
      </el-form-item> -->

      <el-form-item label="设置密码" prop="pass" placeholder="请输入密码">
        <el-input
          type="password"
          v-model="userForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPass" placeholder="请再次输入">
        <el-input
          type="password"
          v-model="userForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item prop="tel" label="手机号">
        <el-input v-model="userForm.tel"> </el-input>
      </el-form-item>

      <el-form-item>
        <el-col :span="10">
          <el-input
            v-model="userForm.vcode"
            maxlength="6"
            placeholder="验证码"
            style="width: 125px"
          ></el-input>
        </el-col>
        <el-col :span="12">
          <el-button
            type="primary"
            round
            style="margin-left: 10px; width: 145px"
            @click="getCode"
            :disabled="getCodeBtnDisable"
            >{{ codeBtnWord }}</el-button
          >
        </el-col>
      </el-form-item>
    </el-form>

    <div>
      <el-button
        type="primary"
        @click="submitForm('userForm')"
        style="width: 140px"
        class="registersure_span"
        >确认注册</el-button
      >
    </div>

    <div>
      <el-button plain @click="$router.back(-1)" style="width: 140px"
        >返回登录</el-button
      >
    </div>
  </div>
</template>

<style scoped>
.register_span {
  font-family: Microsoft YaHei;
  color: rgb(69, 137, 148);
  font-size: 22px;
  font-weight: bold;
}
.registersure_span {
  margin: 10px 0 20px 0;
}
</style>

<script>
import md5 from 'js-md5';
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else {
        callback();
      }
    };
    var validateTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不能为空'));
      } else {
        callback();
      }
    };
    // 邮箱判断是否为空
    // var validateEmail = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('邮箱不能为空'));
    //   } else {
    //     callback();
    //   }
    // };
    var validateVcode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      userForm: {
        user: '',
        tel: '',
        // email:'',
        vcode: '',
        pass: '',
        checkPass: '',
      },
      codeBtnWord: '获取验证码',
      waitTime: 61,
      rules: {
        user: [{ validator: validateUser, trigger: 'blur' }],
        tel: [{ validator: validateTel, trigger: 'blur' }],
        // 邮箱规则
        // email: [{ validator: validateEmail, trigger: 'blur'}],
        vcode: [{ validator: validateVcode, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      },
    };
  },
  computed: {
    // 用于校验手机号码格式是否正确
    phoneNumberStyle() {
      let reg = /^1[3456789]\d{9}$/;
      if (!reg.test(this.userForm.tel)) {
        return false;
      }
      return true;
    },
    getCodeBtnDisable: {
      get() {
        if (this.waitTime == 61) {
          if (this.phoneNumberStyle) {
            return false;
          }
        }
        return true;
      },
      set() {},
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userForm.pass = md5(this.userForm.pass);
          this.userForm.checkPass = md5(this.userForm.checkPass);
          // 提交邮箱
          // this.userForm.email = md5(this.userForm.email)
          this.$axios
            .post('/pwd/resetPwd', this.userForm)
            .then((result) => {
              if (result.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '注册成功，请重新登录',
                });
                this.$router.back(-1);
              } else {
                this.$message({
                  type: 'error',
                  message: result.data.msg,
                });
              }
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          this.$message({
            type: 'error',
            message: '请检查输入！',
          });
        }
      });
    },

    getCode() {
      this.$axios
        .post('/phone/sendCode', {
          //获取验证码接口
          id: this.userForm.user,
          phoneNumber: this.userForm.tel,
        })
        .then((result) => {
          if (result.data.code === 1) {
            this.$message({
              type: 'success',
              message: '验证码已发送，10分钟内有效！',
            });
          } else {
            this.$message({
              type: 'info',
              message: result.data.msg,
            });
          }
        })
        .catch((error) => {
          alert(error);
        });
      let that = this;
      that.waitTime--;
      this.codeBtnWord = `${that.waitTime} 秒后重新获取`;
      let timer = setInterval(function () {
        if (that.waitTime > 1) {
          that.waitTime--;
          that.codeBtnWord = `${that.waitTime} 秒后重新获取`;
        } else {
          clearInterval(timer);
          that.codeBtnWord = '获取验证码';
          that.waitTime = 61;
        }
      }, 1000);
    },
  },
};
</script>

<style>
.register_div {
  border: 1px;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  height: 520px;
  width: 350px;
  padding: 20px;
  text-align: center;
}
</style>
