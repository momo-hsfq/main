<template>
  <el-footer>
    <div id="footer">
      <p>{{ copyRight }}</p>
      <!-- <p>{{ mail }}</p> -->
    </div>
  </el-footer>
</template>

<script>
export default {
  data() {
    return {
      copyRight: 'Copyright © www.sdu.edu.cn, All Rights Reserved.',
      // mail: '',
    };
  },
};
</script>

<style>
#footer {
  height: 40px;
  background-color: #a0a0a0;
}
</style>
