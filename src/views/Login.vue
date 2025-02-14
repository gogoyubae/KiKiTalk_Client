<template>
  <button @click="kakaoLogin" class="kakao-button">
    <img src="@/assets/kakao_login_medium_wide.png" alt="카카오 로그인" />
  </button>
</template>

<script setup>
const kakaoLogin = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
};

// 카카오 로그인 성공 후 리다이렉트된 페이지에서 처리
const handleKakaoCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code"); // URL에서 'code' 값을 추출

  try {
    // 백엔드에 로그인 처리 요청 (로그인 결과 받기)
    const response = await axios.get(`http://localhost:8080/login/oauth2/code/kakao?code=${code}`);

    // JSON 응답 데이터 처리
    const { accessToken, refreshToken, isNewUser } = response.data;

    // 받은 토큰을 로컬 스토리지에 저장
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    if (isNewUser) {
      // 새 사용자일 경우 회원가입 페이지로 리다이렉트
      window.location.href = "/signup";
    } else {
      // 기존 사용자일 경우 홈 페이지로 리다이렉트
      window.location.href = "/home";
    }
  } catch (error) {
    console.error("로그인 처리 중 오류 발생:", error);
  }
};

// 페이지 로딩 시 카카오 콜백을 처리하는 함수 호출
handleKakaoCallback();
</script>
