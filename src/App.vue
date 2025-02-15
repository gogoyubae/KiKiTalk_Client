<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <container class="app-container">
    <div class="home">
      <header class="header">KiKiTalk</header>
    </div>

    <RouterView />
  </container>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  height: 100vh; /* 전체 높이 */
  text-align: center;
}

.header {
  font-size: 30px;
  color: #333;
  margin-bottom: 0px;
  margin-left: 10px;
}
</style>
