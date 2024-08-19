<template>
  <div>
    <div class="p-5 mb-4 bg-light rounded-3 shadow-sm">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Login Page</h1>
        <p>Full Stack JavaScript Developer with Express and Vue 3</p>
      </div>
    </div>

    <div class="p-5 bg-light rounded-3 shadow-sm my-5">
      <div class="container-fluid py-5">
        <div class="text-center">
          <h1 class="display-5 fw-bold">Login Form</h1>
        </div>

        <div v-if="validation.errors" class="alert alert-danger mt-2">
          <ul class="mt-0 mb-0">
            <li v-for="(error, index) in validation.errors" :key="index">
              {{ `${error.path} : ${error.msg}` }}
            </li>
          </ul>
        </div>

        <div v-if="loginFailed.message" class="mt-2 alert alert-danger">
          {{ loginFailed.message }}
        </div>

        <form @submit.prevent="login">
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
import { useRouter } from "vue-router";
import api from "../../services/api";
import Cookies from "js-cookie";

const router = useRouter()

const validation = ref([])
const loginFailed = ref([])

const form = reactive({
  email: "",
  password: "",
})

const login = () => {
  api.post('/login', {
    email: form.email,
    password: form.password
  })
    .then(response => {
      // set token and user on cookies
      Cookies.set('token', response.data.data.token)
      Cookies.set('user', JSON.stringify(response.data.data.user))

      // verifiy token
      if (Cookies.get('token')) {
        // redirect to dashboard
        router.push({ name: 'dashboard' })
      }
    })
  .catch(error => {
    // validation value with error
    validation.value = error.response.data

    // loginFailed value with error
    loginFailed.value = error.response.data
  })
}
</script>

