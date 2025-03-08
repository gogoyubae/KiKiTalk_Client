<template>
  <div class="chat">
    <div class="card">
      <div class="card-header msg_head">
        <div class="d-flex bd-highlight">
          <div class="img_cont">
            <img
              src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
              class="rounded-circle user_img"
            />
          </div>
          <div class="user_info">
            <span class="name">한예인</span>
            <span class="message">all my people hello hello</span>
          </div>
        </div>
        <span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
      </div>

      <div class="card-body msg_card_body" ref="messageContainer">
        <div
          v-for="(item, idx) in messageList"
          :key="idx"
          :class="[
            'd-flex',
            item.username === username
              ? 'justify-content-end'
              : 'justify-content-start',
            'mb-4',
          ]"
        >
          <div v-if="item.username !== username">
            <div class="img_cont_msg">
              <img
                src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                class="rounded-circle user_img_msg"
              />
            </div>
          </div>
          <div
            :class="
              item.username === username
                ? 'msg_container_send'
                : 'msg_container'
            "
          >
            {{ item.content }}
            <span
              :class="item.username === username ? 'msg_time_send' : 'msg_time'"
              >{{ item.timestamp }}</span
            >
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="input-group">
          <div class="input-group-append">
            <span class="input-group-text attach_btn"
              ><i class="fas fa-paperclip"></i
            ></span>
          </div>
          <textarea
            name=""
            class="form-control type_msg"
            v-model="message"
            @keyup.enter="sendMessage"
            placeholder="메시지를 입력하세요"
          ></textarea>
          <div class="input-group-append">
            <span class="input-group-text send_btn" @click="sendMessage"
              ><i class="fas fa-location-arrow"></i
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import axios from "axios";

const accessToken = localStorage.getItem("accessToken");
const payload = JSON.parse(atob(accessToken.split(".")[1]));
const id = payload.sub;
console.log(id);

const fetchUsername = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/username/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log(response);
    username.value = response.data;
    console.log("username", username);
  } catch (error) {
    console.error("유저 정보를 불러오지 못했습니다.", error);
  }
};

const username = ref("");
const message = ref("");
const messageList = ref([]);
const messageContainer = ref(null);
let stompClient = null;

const sendMessage = () => {
  if (message.value.trim()) {
    send();
    message.value = "";
    nextTick(() => {
      scrollToBottom();
    });
  }
};

const send = () => {
  if (stompClient && stompClient.connected) {
    const msg = {
      username: username.value,
      content: message.value,
      timeStamp: new Date().toLocaleTimeString(),
    };
    messageList.value.push(msg);
    stompClient.send("/receive", JSON.stringify(msg), {});
  }
};

watch(messageList, () => {
  nextTick(() => scrollToBottom());
});

const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

const connect = () => {
  const serverURL = "http://localhost:8080/socket";
  let socket = new SockJS(serverURL);
  stompClient = Stomp.over(socket);
  console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);

  stompClient.connect(
    {},
    (frame) => {
      console.log("소켓 연결 성공", frame);
      stompClient.subscribe("/send", (res) => {
        console.log("받은 메시지:", res.body);
        messageList.value.push(JSON.parse(res.body));
      });
    },
    (error) => {
      console.error("소켓 연결 실패", error);
    }
  );
};

onMounted(async () => {
  await fetchUsername();
  connect();
});

onUnmounted(() => {
  if (stompClient) {
    stompClient.disconnect();
    console.log("소켓 연결 해제");
  }
});
</script>
