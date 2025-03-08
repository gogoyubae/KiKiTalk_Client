<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";

const username = ref("");
const message = ref("");
const recvList = ref([]);
let stompClient = null;

const sendMessage = (e) => {
  if (e.keyCode === 13 && username.value.trim() && message.value.trim()) {
    send();
    message.value = "";
  }
};

const send = () => {
  if (stompClient && stompClient.connected) {
    const msg = {
      username: username.value,
      content: message.value,
    };
    stompClient.send("/receive", JSON.stringify(msg), {});
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
        console.log("구독된 메시지:", res.body);
        recvList.value.push(JSON.parse(res.body));
      });
    },
    (error) => {
      console.error("소켓 연결 실패", error);
    }
  );
};

onMounted(() => {
  connect();
});

onUnmounted(() => {
  if (stompClient) {
    stompClient.disconnect();
    console.log("소켓 연결 해제");
  }
});
</script>

<template>
  <div class="chat-container">
    <h1>채팅방</h1>
    <div class="chat-box">
      <div v-for="(item, idx) in recvList" :key="idx" class="chat-message">
        <strong>{{ item.username }}:</strong> {{ item.content }}
      </div>
    </div>
    <div class="chat-input">
      <input v-model="username" type="text" placeholder="유저 이름 입력" />
      <input
        v-model="message"
        type="text"
        placeholder="메시지 입력"
        @keyup="sendMessage"
      />
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.chat-box {
  width: 400px;
  height: 300px;
  border: 1px solid #ccc;
  overflow-y: auto;
  margin-bottom: 10px;
  padding: 10px;
}

.chat-message {
  background: #f1f1f1;
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
}

.chat-input {
  display: flex;
  gap: 5px;
}

.chat-input input {
  padding: 5px;
  border: 1px solid #ccc;
}
</style>
