<template>
  <button @click="kakaoLogin" class="kakao-button">
    <img src="@/assets/kakao_login_medium_wide.png" alt="카카오 로그인" />
  </button>
</template>

<script setup>
const kakaoLogin = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
};
</script>
