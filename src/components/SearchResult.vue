<template>
  <div>
    <div class="contacts">
      <div>검색 결과</div>
      <li v-if="searchedUser">
        <div class="d-flex bd-highlight">
          <div class="img_cont">
            <img :src="profileImg" class="rounded-circle user_img" />
          </div>
          <div class="user_info">
            <span class="name">{{ name }}</span>
            <span class="message">{{ message }}</span>
          </div>
          <div class="add_friend">
            <span @click="confirmAddFriend" v-if="!isFriend" class="search_btn">
              <i class="fa-solid fa-plus"></i>
            </span>
          </div>
        </div>
      </li>
    </div>
    <hr />
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
import axios from "axios";

// 외부에서 전달된 prop로 검색된 유저를 받음
const props = defineProps({
  searchedUser: {
    type: Object,
    required: false, // ❗ `false`로 설정하여 undefined 허용
    default: () => ({}), // ❗ 기본값 추가
  },
});
const name = ref(props.searchedUser.name);
const message = ref(props.searchedUser.message);
const profileImg = ref(props.searchedUser.profileImg);
const id = ref(props.searchedUser.id);
const isFriend = ref(false);

watch(
  () => props.searchedUser,
  (newUser) => {
    name.value = newUser.name;
    message.value = newUser.message;
    profileImg.value = newUser.profileImg;
    id.value = newUser.id;
    checkIfFriend();
  }
);

const checkIfFriend = async () => {
  if (!id.value) return;
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      `http://localhost:8080/api/v1/relationship/is-friend/${id.value}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    isFriend.value = response.data; // API로 받은 친구 여부 값 설정
  } catch (error) {
    console.error("친구 여부 확인 실패:", error);
  }
};

const confirmAddFriend = () => {
  if (confirm(`${name.value}님을 친구로 추가하시겠습니까?`)) {
    console.log(id);
    addFriend();
  }
};

const addFriend = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    await axios.post(
      `http://localhost:8080/api/v1/relationship/add/${id.value}`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    isFriend.value = true;
    alert("친구 추가 성공");
  } catch (e) {
    console.error("친구 추가 실패", e);
  }
};
</script>
