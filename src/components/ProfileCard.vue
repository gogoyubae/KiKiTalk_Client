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
      <ul class="profiles">
        <li
          v-for="profile in profiles"
          :key="profile.name"
        >
          <div class="d-flex bd-highlight">
            <div class="img_cont">
              <img :src="profile.img" class="rounded-circle user_img" />
            </div>
            <div class="user_info">
              <span class="name">{{ profile.name }}</span>
              <span class="message">{{ profile.status }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>