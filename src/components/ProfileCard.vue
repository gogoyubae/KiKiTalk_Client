<script setup>
defineProps({
  profileImage: { type: String, default: "/default-avatar.png" }, // 기본 이미지 설정
  name: { type: String, required: true },
  statusMessage: { type: String, default: "" },
  showActionButton: { type: Boolean, default: false }, // 추가 버튼 표시 여부
});
</script>

<template>
  <div class="card-body profiles_body">
    <div class="d-flex bd-highlight">
      <div class="img_cont">
        <img :src="profileImage" class="rounded-circle user_img" />
      </div>
      <div class="user_info">
        <span class="name">{{ name }}</span>
        <span class="message">{{ statusMessage }}</span>
      </div>
    </div>
  </div>
</template>
