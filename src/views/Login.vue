<template>
  <img
    src="@/assets/kakao_login_medium_wide.png"
    alt="카카오 로그인"
    @click="kakaoLogin"
    class="kakao-button"
  />
</template>

<script setup>
const kakaoLogin = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
};
</script>

<style scoped>
.kakao-button {
  cursor: pointer;
  display: block; /* 인라인 요소가 아닌 블록 요소로 변경 */
  height: auto;
  transition: opacity 0.2s ease-in-out;
}

.kakao-button:hover {
  opacity: 0.8; /* 버튼에 hover 효과 추가 */
}
</style>
