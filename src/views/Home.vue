<script setup>
import { onMounted } from 'vue';
import {useAuthStore} from '@/stores/auth';
import { useRouter } from 'vue-router'; 

const authStore = useAuthStore();
const router =useRouter();

onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refershToken');

    if(accessToken) {
        authStore.setToken(accessToken,refreshToken);
        router.push('/home');
    }
});

</script>