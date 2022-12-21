<template>
  <div style="margin:20px;overflow-x:hidden">
  <el-menu
      ref="elmenu"
      :default-active="this.$route.path.substring(1)"
      @open="handleOpen"
      @close="handleClose"
      unique-opened
      background-color="#547387"
      text-color="#fff"
      active-text-color="#a1c4db"
      router="true">

    <template v-for="item in menu">
      <el-submenu v-if="item.sub" :index="item.id" :key="item.id">
        <template slot="title">
          <span v-text="item.name"></span>
        </template>
        <template v-for="sub in item.sub">
          <el-submenu v-if="sub.sub_sub" :index="sub.id" :key="sub.id">
            <template slot="title">
              <span>{{sub.name}}</span>
            </template>
            <el-menu-item-group v-for="sub_sub in sub.sub_sub" :key="sub_sub.componentName">
              <template slot="title">
              <el-menu-item :index="sub_sub.componentName" v-text="sub_sub.name">
              </el-menu-item>
              </template>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item-group v-else :key="sub.componentName">
            <el-menu-item :index="sub.componentName" v-text="sub.name">
            </el-menu-item>
          </el-menu-item-group>
        </template> 
      </el-submenu>
      <el-submenu v-else :key="item.componentName">
        <el-submenu :index="item.componentName" v-text="item.name">
        </el-submenu>
      </el-submenu>
    </template>
      

  </el-menu>
  </div>
</template>

<script>
import { group } from 'console';
import stuMenu from '../global/stuMenu.config.js'
  export default {
    data(){
        return{
            menu:stuMenu
        }
    }
  }
</script>