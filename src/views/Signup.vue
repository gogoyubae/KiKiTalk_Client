<template>
  <div>
    <h1>회원가입</h1>
    <img :src="profileImage" alt="프로필 이미지" v-if="profileImage" />
    <p>이름: {{ name }}</p>

    <form @submit.prevent="submitSignup">
      <label>닉네임</label>
      <input v-model="nickname" required />

      <label>전화번호</label>
      <input v-model="phone" required />

      <button type="submit">가입 완료</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/utils/axios";
import { useAuthStore } from "@/stores/auth";

const kakaoAuthId = ref("");
const name = ref("");
const profileImage = ref("");
const nickname = ref("");
const phone = ref("");
const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  kakaoAuthId.value = urlParams.get("kakaoAuthId");
  name.value = urlParams.get("name");
  profileImage.value = urlParams.get("profileImage");
  router.replace("/signup");
  console.log(kakaoAuthId);
});

const submitSignup = async () => {
  try {
    const response = await api.post(
      "/auth/signup",
      {
        kakaoAuthId: kakaoAuthId.value,
        name: name.value,
        profileImage: profileImage.value,
        nickname: nickname.value,
        phone: phone.value,
      },
      {
        withCredentials: true,
      }
    );
    if (!response.data.success)
      throw new Error("회원가입 실패 response data failed");

    // ✅ 서버에서 accessToken과 refreshToken을 응답받음
    const accessToken = response.headers.get("accessToken");
    const refreshToken = response.headers.get("refreshToken");

    console.log(accessToken);
    console.log(refreshToken);
    
    // ✅ JWT 저장 (localStorage + Pinia 상태)
    authStore.setToken(accessToken, refreshToken);

    router.push("/home"); // 회원가입 완료 후 홈으로 이동
  } catch (error) {
    console.error(error);
    alert("회원가입 실패");
  }
};
</script>
