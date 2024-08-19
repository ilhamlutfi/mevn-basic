<template>
    <div>
        <div class="p-5 bg-light rounded-3 shadow-sm">
            <div class="container-fluid py-5">
                <h1 class="display-5 fw-bold">Register Page</h1>
                <p>Full Stack JavaScript Developer with Express and Vue 3</p>
            </div>
        </div>

        <div class="p-5 bg-light rounded-3 shadow-sm my-5">
            <div class="container-fluid py-5">
                <div class="text-center">
                    <h1 class="display-5 fw-bold">Register Form</h1>
                </div>

                <div v-if="validation.errors" class="alert alert-danger mt-2">
                    <ul class="mt-0 mb-0">
                        <li v-for="(error, index) in validation.errors" :key="index">
                            {{ `${error.path} : ${error.msg}` }}
                        </li>
                    </ul>
                </div>

                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="name">Full Name</label>
                        <input type="text" v-model="form.name" class="form-control" id="name" />
                    </div>

                    <div class="mb-3">
                        <label for="email">Email</label>
                        <input type="email" v-model="form.email" class="form-control" id="email" />
                    </div>

                    <div class="mb-3">
                        <label for="password">Password</label>
                        <input type="password" v-model="form.password" class="form-control" id="password" />
                    </div>

                    <router-link :to="{ name: 'home' }" class="btn btn-secondary w-100 mb-2">Back</router-link>
                    <button type="submit" class="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import api from "../../services/api";
import { useRouter } from "vue-router";

const validation = ref([])

const router = useRouter()

const form = reactive({
    name: "",
    email: "",
    password: "",
})

const register = async () => {
    await api.post('/register', {
        name: form.name,
        email: form.email,
        password: form.password
    })
    .then(() => {
        form.name = ''
        form.email = ''
        form.password = ''

        alert('User has been created')
        router.push({ name: 'home' })
    })
    .catch(error => {
        validation.value = error.response.data
    })
}
</script>
