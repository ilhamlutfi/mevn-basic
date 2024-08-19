<template>
    <div class="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold">Create User Page</h1>
            <p class="col-md-12 fs-4">Full Stack JavaScript Developer with Express and Vue 3</p>
            <hr />

                <div v-if="validation.errors" class="alert alert-danger mt-2">
                    <ul class="mt-0 mb-0">
                        <li v-for="(error, index) in validation.errors" :key="index">
                            {{ `${error.path} : ${error.msg}` }}
                        </li>
                    </ul>
                </div>

                <form @submit.prevent="store">
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
</template>

<script setup>
    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import api from '../../../services/api'
    import Cookies from 'js-cookie'

    const router = useRouter()
    const token = Cookies.get('token')

    const validation = ref([])

    const form = reactive({
        name: '',
        email: '',
        password: ''
    })

    const store = async () => {
        api.defaults.headers.common['Authorization'] = token
        await api.post('/admin/users', {
            name: form.name,
            email: form.email,
            password: form.password
        })
        .then(() => {
            alert('User has been created')
            
            router.push({
                name: 'admin.users.index'
            })
        })
        .catch(error => {
            validation.value = error.response.data
        })
    }
</script>

