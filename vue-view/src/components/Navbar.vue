
<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
                    </li>
                </ul>

                <div class="ml-end">
                    <ul class="navbar-nav">

                        <li class="nav-item">
                            <router-link :to="{ name: 'dashboard' }" class="nav-link">Dashboard</router-link>
                        </li>

                        <li class="nav-item">
                            <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
                        </li>

                        <li class="nav-item">
                            <a href="" @click.prevent="logout" class="nav-link">Logout</a>
                        </li>

                        <li class="nav-item">
                            <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const router = useRouter();

const logout = () => {
    //remove token and user on cookies
    Cookies.remove('token');
    Cookies.remove('user');

    //redirect to login
    router.push({ name: 'login' });
}
</script>
