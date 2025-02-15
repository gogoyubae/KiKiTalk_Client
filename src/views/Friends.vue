<template>
  <ul class="profiles">
    <li v-for="friend in friends" :key="friend.id" class="profiles_item">
      <ProfileCard
        :key="friend.id"
        :profileImage="friend.image"
        :name="friend.name"
        :statusMessage="friend.status"
        :showActionButton="true"
      />
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import ProfileCard from "@/components/ProfileCard.vue";

const friends = ref([
  {
    id: 1,
    name: "Khalid",
    status: "Khalid is online",
    image: "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg",
  },
  {
    id: 2,
    name: "Taherah Big",
    status: "Taherah left 7 mins ago",
    image:
      "https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg",
  },
  {
    id: 4,
    name: "배윤희",
    status: "all my people hello hello",
    image: "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg",
  },
  {
    id: 5,
    name: "라멘",
    status: "ㄱㄱ",
    image:
      "https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg",
  },
  {
    id: 6,
    name: "신동의",
    status: "돈스타브 합시다",
    image: "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg",
  },
  {
    id: 3,
    name: "한상민",
    status: "반만하자",
    image:
      "https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg",
  },
]);
</script>
