<template>
    <div style="width:1100px">
      <el-table
      :data="selectEAData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      v-loading="loading"
      border
      stripe
      style="width: 100%"
      :header-row-style="{height:'20px'}"
      :header-cell-style="{padding:'4px'}"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'2px'}">
        <el-table-column label="课外活动">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="课外活动主题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="details"
          label="课外活动内容"
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
            selectEAData: [],
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
          getSelectEAData(){
            this.$axios
            .post('/student/getStudentExtracurricularActivitiesData', { //获取查询学生课外活动信息接口
            })
            .then((result)=> {
              if (result.data.code === 1) {
                  this.selectEAData = result.data.datas
              }else{
                  this.selectEAData = []
                  alert("未查询到课外活动信息")
                  return false;
              }
            })
            .catch((error)=> {
              alert(error)
            })
          }
      },
      created:function(){
        this.getSelectEAData()
      }
  }
  </script>