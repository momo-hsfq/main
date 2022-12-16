<template>
  <div style="width:1100px">
    <el-table
    :data="selectPAData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    v-loading="loading"
    border
    stripe
    style="width: 100%"
    :header-row-style="{height:'20px'}"
    :header-cell-style="{padding:'4px'}"
    :row-style="{height:'20px'}"
    :cell-style="{padding:'2px'}">
      <el-table-column
        prop="ID"
        label="学号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="Ta为你打的标签"
        width="180">
      </el-table-column>
      <el-table-column
        prop="assessment"
        label="Ta给你的评价">
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
          selectPAData: [],
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
        getSelectPAData(){
          this.$axios
          .post('/student/getStudentPeerAssessmentData', { //获取查询学生互评信息接口
          })
          .then((result)=> {
            if (result.data.code === 1) {
                this.selectPAData = result.data.datas
            }else{
                this.selectPAData = []
                alert("未查询到互评信息")
                return false;
            }
          })
          .catch((error)=> {
            alert(error)
          })
        }
    },
    created:function(){
      this.getSelectPAData()
    }
}
</script>