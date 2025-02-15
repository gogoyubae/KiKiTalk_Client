<template>
  <div class="card-body profiles_body">
    <ul class="profiles">
      <li
        v-for="profile in profiles"
        :key="profile.name"
        :class="{ active: profile.active }"
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

<script>
import ProfileCard from "@/components/ProfileCard.vue";
export default {
  data() {
    return {
      profiles: [
        {
          name: "Khalid",
          status: "Khalid is online",
          img: "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg",
          online: true,
          active: true,
        },
        {
          name: "Taherah Big",
          status: "Taherah left 7 mins ago",
          img: "https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg",
          online: false,
          active: false,
        },
        // Add more profiles as needed
      ],
    };
  },
};
</script>

<style scoped>
/* Add any custom styles for the profiles component */
</style>
