<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import SearchResult from "../components/SearchResult.vue";
import Friends from "../components/Friends.vue"

const router = useRouter();
const username = ref("");
const message = ref("");
const profileImg = ref("");

const searchedUser = ref({
  name: "",
  message: "",
  profileImg: "",
  id:"",
});
const searchPhone = ref("");

// ✅ `accessToken`을 URL에서 가져와 `localStorage`에 저장하는 함수
const handleAccessToken = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      console.log("✅ accessToken 추출:", accessToken);

      // 🔥 accessToken 저장
      localStorage.setItem("accessToken", accessToken);
      console.log("✅ accessToken 저장 완료!");

      // 🔥 URL에서 accessToken 제거 & /home 이동
      await router.replace("/home");
      return;
    }
  } catch (error) {
    console.error("❌ accessToken 저장 중 오류 발생:", error);
  }
};

const getProfile = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken"); // 저장된 토큰 가져오기
    const response = await axios.get("http://localhost:8080/api/v1/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    username.value = response.data.name;
    message.value = response.data.message;
    profileImg.value = response.data.profileImage;

  } catch (e) {
    console.error("failed to get profile info");
  }
};

const searchFriend = async () => {
  if (!searchPhone.value) {
    console.log("전화번호를 입력하지 않았습니다.");
    return;
  }
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(`http://localhost:8080/api/v1/search`, {
      params: { phone: searchPhone.value },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log("응답 상태 코드", response.status);
    if (response.status === 200) {
      searchedUser.value = {
        name: response.data.name,
        message: response.data.message,
        profileImg: response.data.profileImage,
        id: response.data.id,
      };
      console.log("검색된 유저:", searchedUser.value);
    }
  } catch (error) {
    console.error("유저 검색 실패");
  }
};

// ✅ onMounted에서 실행할 로직
onMounted(async () => {
  await handleAccessToken(); // 🔥 1. accessToken 저장 & /home 이동 시도
  await getProfile();
//  await fetchFriends(); // 🔥 3. 친구 목록 불러오기
});
</script>

<template>
  <div>
    <div class="chat">
      <div class="card mb-sm-3 mb-md-0 contacts_card">
        <div class="card-header">
          <div class="input-group">
            <input
              v-model="searchPhone"
              type="text"
              placeholder="Search..."
              class="form-control search"
            />
            <div>
              <span class="input-group-text search_btn" @click="searchFriend"
                ><i class="fas fa-search"></i
              ></span>
            </div>
          </div>
        </div>
        <div class="card-body contacts_body">
          <div class="contacts">
            <li>
              <div class="d-flex bd-highlight">
                <div class="img_cont">
                  <img :src="profileImg" class="rounded-circle user_img" />
                </div>
                <div class="user_info">
                  <span class="name">{{ username }}</span>
                  <span class="message">{{ message }}</span>
                </div>
              </div>
            </li>
            <hr />
            <SearchResult
              v-if="searchedUser && searchedUser.name"
              :searchedUser="searchedUser"
            />
            <Friends />
          </div>
        </div>
        <div class="card-footer"></div>
      </div>
    </div>
  </div>
</template>
