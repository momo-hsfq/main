<template>
  <div id="app">
    <el-container class="container">
      <el-header class="shadow_out">
        <v-header></v-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- <el-main>
        <v-loginUser></v-loginUser>
      </el-main> -->
      <el-footer height="60px">
        <v-footer></v-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import header from './components/common/Header.vue';
import footer from './components/common/Footer.vue';
import loginUser from './components/login/LoginUser.vue';

export default {
  name: 'App',
  components: {
    'v-header': header,
    'v-footer': footer,
    'v-loginUser': loginUser,
  },
};
</script>

<style scoped>
/* .container {
  height: 1000px;
}
#app {
  height: 790px;
} */
.el-container {
  height: 1000px;
  width: 100%;
}
.el-footer {
  height: 100px;
}
</style>
