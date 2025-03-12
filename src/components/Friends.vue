<template>
  <div class="contacts">
    <li v-for="friend in friends" :key="friend.id" @click="goToChat(friend.id)">
      <div class="d-flex bd-highlight">
        <div class="img_cont">
          <img :src="friend.profileImage" class="rounded-circle user_img" />
        </div>
        <div class="user_info">
          <span class="name">{{ friend.name }}</span>
          <span class="message">{{ friend.message }}</span>
        </div>
      </div>
    </li>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// 친구 목록을 담을 변수
const friends = ref([]);

// 친구 목록을 불러오는 함수
const fetchFriends = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      "http://localhost:8080/api/v1/relationship/list",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    friends.value = response.data;
    console.log("친구 목록 불러오기 성공:", friends.value);
  } catch (error) {
    console.error("친구 목록 불러오기 실패:", error);
  }
};

// onMounted에서 친구 목록을 불러오기
onMounted(fetchFriends);

// vue-router를 사용하여 페이지 이동
const router = useRouter();

// 클릭 시 채팅 페이지로 이동하는 함수
const goToChat = (friendId) => {
  router.push({ path: `/chat/${friendId}` });
};
</script>
