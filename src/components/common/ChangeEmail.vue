<template>
    <div class="changePT" style="height:200">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
      <el-form-item prop="email" label="邮箱地址：">
          <el-input v-model="userForm.email" > </el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="userForm.vcode" maxlength="6" placeholder="验证码" style="width: 125px"></el-input> 
        <el-button type="primary" round style="margin-left:10px;width:145px" @click="getCode()" :disabled="getCodeBtnDisable">{{codeBtnWord}}</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')" style="width:300px">确认</el-button>
      </el-form-item>
    </el-form>
    </div>
    </template>

    <script>
    import {getCookie} from '../global/cookie'
      export default {
        data() {
            var validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('邮箱号不能为空'));
                } else {
                    callback();
                }
            };
            return {
            userForm: {
                email:'',
                vcode:''
            },
            rules: {
                email: [{ validator: validateEmail, trigger: 'blur'}],
            },
            codeBtnWord:'获取验证码',
            waitTime:61,
          };
        },computed:{
            // 用于校验邮箱格式是否正确
            emailAddressStyle(){
                let reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
                if(!reg.test(this.userForm.email)){
                    return false
                }
                return true
            },
            getCodeBtnDisable:{
                get(){
                    if(this.waitTime == 61){
                        if(this.emailAddressStyle){
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
                    this.$axios
                    .post('/pwd/changeEmailAddress', {
                        email:this.userForm.email,
                        emailAddress:this.userForm.vcode
                    })
                    .then((result)=> {
                    if (result.data.code === 1) {
                        this.$message({
                            type: 'success',
                            message: '邮箱号已更换'
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
                } else {
                    alert('请检查输入');
                    return false;
                }
            })
          },
          getCode(){
            this.$axios
            .post('/email/sendChangeEmailAddress', { //获取验证码接口
                emailAddress:this.userForm.email
            })
            .then((result)=> {
                if (result.data.code === 1) {
                    this.$message({
                        type: 'success',
                        message: '验证码已发送,10分钟内有效!'
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