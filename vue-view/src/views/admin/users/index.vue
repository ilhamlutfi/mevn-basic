<template>
    <div class="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold">Users Page</h1>
            <p class="col-md-12 fs-4">Full Stack JavaScript Developer with Express and Vue 3</p>
            <hr />

            <router-link :to="{ name: 'admin.users.create' }" class="btn btn-primary mb-2">Create User</router-link>
            
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <td>No</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Register At</td>
                        <td>Action</td>
                    </tr>
                </thead>

                <tbody>
                    <tr class="text-center" v-if="users.length == 0">
                        <td colspan="5">Data Belum Tersedia</td>
                    </tr>

                    <tr v-else v-for="(user, index) in users" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.createdAt }}</td>
                        <td class="text-center">
                            <router-link :to="{ name: 'admin.users.edit', params: { id: user.id} }" class="btn btn-success me-2">Edit</router-link>
                            <button class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import Cookies from 'js-cookie'
import { onMounted, ref } from 'vue'
import api from '../../../services/api'

const token = Cookies.get('token')
const users = ref([])

const fetchUser = async () => {
    api.defaults.headers.common['Authorization'] = token

    await api.get('/admin/users')
        .then(response => {
            users.value = response.data.data
        })
}

onMounted(() => {
    fetchUser()
})
</script>
