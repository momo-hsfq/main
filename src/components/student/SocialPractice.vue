<template>
    <div style="width:1100px">
      <el-table
      :data="selectSPData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      v-loading="loading"
      border
      stripe
      style="width: 100%"
      :header-row-style="{height:'20px'}"
      :header-cell-style="{padding:'4px'}"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'2px'}">
        <el-table-column label="社会实践">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="社会实践主题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="details"
          label="社会实践内容"
          width="180">
        </el-table-column>
        <el-table-column
          prop="achievement"
          label="成果">
        </el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalCount"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        style="text-align:center">
      </el-pagination>
    </div>
  </template>

  <script>
  import {getCookie} from '../global/cookie'
  export default {
      data() {
          return {
            selectSPData: [],
            pageSize:20,
            currentPage:1,
            totalCount:1,
            loading:false
          }
      },
      methods: {
          handleCurrentChange(val) {
            this.currentPage=val
          },
          getSelectSPData(){
            this.$axios
            .post('/student/getStudentSocialPracticeData', { //获取查询学生社会实践信息接口
            })
            .then((result)=> {
              if (result.data.code === 1) {
                  this.selectSPData = result.data.datas
                  //this.totalCount = result.data.datas.length
              }else{
                  this.selectSPData = []
                  alert("未查询到社会实践信息")
                  return false;
              }
            })
            .catch((error)=> {
              alert(error)
            })
          }
      },
      created:function(){
        this.getSelectSPData()
      }
  }
  </script>