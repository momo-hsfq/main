<template>
  <div id="forgot" class="forgot_div">
    <span class="login_span">忘记密码</span>
    <el-divider></el-divider>
    <el-form :model="userForm" :rules="rules" ref="userForm" label-width="70px">
    <el-form-item prop="user" label="用户名">
        <el-input v-model="userForm.user"></el-input>
    </el-form-item>
  
    <el-form-item prop="email" label="邮箱">
      <el-input
        v-model="userForm.email"
        autocomplete="off">
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-col :span="10">
        <el-input v-model="userForm.emailCode" maxlength="6" placeholder="验证码" style="width: 125px"></el-input> 
      </el-col>
      <el-col :span="12">
        <el-button type="primary" round style="margin-left:10px;width:145px" @click="getEmailCode" :disabled="getCodeBtnDisable">{{codeBtnWord}}</el-button>
      </el-col>
    </el-form-item>
    
    
     <el-form-item label="新密码" prop="pass">
      <el-input type="password" v-model="userForm.pass" autocomplete="off"></el-input>
    </el-form-item>
  
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="userForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    
    <el-form-item>
      <el-col :span="16">
        <el-button type="primary" @click="submitForm('userForm')" style="width: 170px">确认</el-button>
      </el-col>
      <el-col :span="6">
        <el-button plain  @click="$router.back(-1)" style="width: 100px">返回登录</el-button>
      </el-col>
    </el-form-item>
  </el-form>
  </div>
  </template>
  
  <script>
  import {getEmailCode} from "@/axios";
import { request } from "http";
  import md5 from "js-md5"
    export default {
      data() {
        var validateUser = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('用户名不能为空'));
          } else {
            callback();
          }
        };
        var validateEmail = (rule, value, callback) => {
          if (value === "") {
            callback(new Error("请输入邮箱"));
          } else {
            if(value != ""){
              if(!this.emailReg.test(value)){
                callback(new Error("请输入正确的邮箱"));
                return
              }
            }
            callback();
          }
        };
        var validateEmailCode = (rule, value, callback) => {
          if (value === "") {
            callback(new Error("请输入验证码"));
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
          disabledEmailCode:false,
          countNum:60,
          countTimer:null,
          userForm: {
              user:'',
              email:'',
              emailCode:'',
              pass:'',
              checkPass:'',
          },
          codeBtnWord:'获取验证码',
          waitTime:61,
          rules: {
            user:[{ validator: validateUser, trigger: 'blur'}],
            email: [{required: false},{ validator: validateEmail, trigger: "blur" }],
            emailCode: [{required: false},{ validator: validateEmailCode, trigger: "blur" }],
            pass:[{ validator: validatePass, trigger: 'blur'}],
            checkPass: [{ validator: validatePass2, trigger: 'blur'}]
          }
        };
      },
      created(){
      },
      computed:{
            // 用于校验邮箱格式是否正确
            emailNumberStyle(){
                let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                if(!reg.test(this.userForm.email)){
                    return false
                }
                return true
            },
            getCodeBtnDisable:{
                get(){
                    if(this.waitTime == 61){
                        if(this.emailNumberStyle){
                            return false
                        }  
                    }
                    return true
                },
                set(){}
            }
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.userForm.pass = md5(this.userForm.pass)
              this.userForm.checkPass = md5(this.userForm.checkPass)
              this.$axios
              .post('/pwd/resetPwd',this.userForm)
              .then((result)=> {
                if (result.data.code === 1) {
                  this.$message({
                    type: 'success',
                    message: '密码重置成功，请重新登录'
                  });
                  this.$router.back(-1)
                }else{
                  this.$message({
                    type: 'error',
                    message: result.data.msg
                  });
                }
              })
              .catch((error)=> {
                alert(error)
              })
            } else {
              this.$message({
                type: 'error',
                message: '请检查输入！'
              });
            }
          })
        },
        getEmailCode(){
          this.$axios
            .post('/sendEmail', { //获取验证码接口
                id:this.userForm.user,
                email:this.userForm.email
            })
            .then((result)=> {
              if (result.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '验证码已发送，10分钟内有效！'
                });
              }else{
                this.$message({
                  type: 'info',
                  message: result.data.msg
                });
              }
            })
            .catch((error)=> {
                alert(error)
            })
            let that = this
            that.waitTime--
            this.codeBtnWord = `${that.waitTime}s 后重新获取`
            let timer = setInterval(function(){
                if(that.waitTime>1){
                    that.waitTime--
                    that.codeBtnWord = `${that.waitTime}s 后重新获取`
                }else{
                    clearInterval(timer)
                    that.codeBtnWord = '获取验证码'
                    that.waitTime = 61
                }
            },1000)
          }
        
      }
    }
  </script>
  
  <style>
  .forgot_div{
      border: 1px;
      border-radius: 2px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      height: 470px;
      width: 350px;
      padding: 20px;
      text-align: center;
  }
  </style>