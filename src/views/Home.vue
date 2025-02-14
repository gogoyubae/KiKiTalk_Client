<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  // 현재 URL에서 accessToken 가져오기 (기존 회원의 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get("accessToken");
  console.log("현재 URL:", window.location.href);
  console.log("추출한 accessToken:", accessToken);
  if (accessToken) {
    // localStorage에 토큰 저장 
    localStorage.setItem("accessToken", accessToken);
    console.log(accessToken);
    // accessToken이 URL에 노출되지 않도록 제거하고 /home으로 이동
    router.replace("/home");
  }
});
</script>

<template>
  <div>
    <h1>홈 페이지</h1>
  </div>
</template>
