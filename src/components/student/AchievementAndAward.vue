<template>
    <div style="width:1100px">
      <el-table
      :data="selectAAData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      v-loading="loading"
      border
      stripe
      style="width: 100%"
      :header-row-style="{height:'20px'}"
      :header-cell-style="{padding:'4px'}"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'2px'}">
        <el-table-column label="成果奖励">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="成果奖励主题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="details"
          label="成果奖励内容">
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
            selectAAData: [],
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
          getSelectAAData(){
            this.$axios
            .post('/student/getStudentAchievementAndAwardData', { //获取查询学生成果奖励信息接口
            })
            .then((result)=> {
              if (result.data.code === 1) {
                  this.selectAAData = result.data.datas
              }else{
                  this.selectAAData = []
                  alert("未查询到成果奖励信息")
                  return false;
              }
            })
            .catch((error)=> {
              alert(error)
            })
          }
      },
      created:function(){
        this.getSelectAAData()
      }
  }
  </script>