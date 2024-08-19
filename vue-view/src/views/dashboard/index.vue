import Cookies from 'js-cookie';
<template>
    <div class="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold">Dashboard Page</h1>
            <p class="col-md-12 fs-4">Full Stack JavaScript Developer with Express and Vue 3</p>
            <hr />
            <p class="col-md-12 fs-4">Welcome, <i><b>{{ user?.name }}</b></i></p>
        </div>
    </div>
</template>

<script setup>
import Cookies from 'js-cookie';
import { onMounted, ref } from 'vue';

const user = ref(null)

onMounted(() => {
    const userData = Cookies.get('user')
    if (userData) {
        user.value = JSON.parse(userData)
    }
})
</script>
