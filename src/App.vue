<template>
  <div id="app">
    <el-container class="">
      <el-header class="shadow_out">
        <v-header></v-header>
      </el-header>
      <router-view></router-view>
      <!-- <el-main>
        <v-loginUser></v-loginUser>
      </el-main> -->
      <el-footer>
        <v-footer></v-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
#app {
  height: 790px;
}
</style>
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
#app {
  height: 790px;
}
</style>
