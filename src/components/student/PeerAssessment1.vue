<template>
  <div>
    <div class="PeerAssessment" style="height:250">
      <div style="margin-bottom: 20px">
          <label>&nbsp;&nbsp;选择同学：</label>
          <el-select v-model="stuSelected" placeholder="请选择你要评价的同学" @change="getStuSelected">
          <el-option
          v-for="item in options"
          :key="item.name"
          :label="item.name"
          :value="item.number">
          </el-option>
          </el-select>
       </div>
      <div style="margin-bottom: 20px">
        <label>请为该同学打上标签： </label>
        <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
         >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
     </div>
     <div style="margin-bottom: 20px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" >
          <el-form-item label="评价描述" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" placeholder="请填写你对该同学的评价"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="resetForm('ruleForm')">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  </template>
  
  <style>
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  </style>
  
  <script>
  import {getCookie} from '../global/cookie'
  import stuOptions from '../global/stuOptions.js'
    export default {
      data() {
        return {
          options:stuOptions,
          stuSelected: '',
          dynamicTags: [],
          inputVisible: false,
          inputValue: '',
          ruleForm: {
            desc: ''
          },
          rules: {
            desc: [
            { required: true, message: '请填写对同学的评价', trigger: 'blur' }
          ]
          }
        }
      },
      methods: {
        

        handleClose(tag) {
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
  
        showInput() {
          this.inputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        },
  
        handleInputConfirm() {
          let inputValue = this.inputValue;
          if (inputValue) {
            this.dynamicTags.push(inputValue);
          }
          this.inputVisible = false;
          this.inputValue = '';
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      },
      created:function(){
        this.getStuSelected()
      }
    }
  </script>