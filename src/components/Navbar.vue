<template>
    <nav class="navbar is-warning is-fixed" role="navigation"
        aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <RouterLink class="navbar-item" to="/" exact>
                    <img alt="Vue logo" class="logo" src="@/assets/logo.svg"
                        width="28" height="28" />
                </RouterLink>

                <a role="button" class="navbar-burger" aria-label="menu"
                    aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div class="navbar-menu">
                <div class="navbar-end">

                    <RouterLink to="/" class="navbar-item">Home</RouterLink>
                    <RouterLink to="/about" class="navbar-item">About</RouterLink>
                    <RouterLink to="/dashboard" class="navbar-item">
                        Dashboard
                    </RouterLink>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            More
                        </a>
                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                About
                            </a>
                            <a class="navbar-item">
                                Jobs
                            </a>
                            <a class="navbar-item">
                                Contact
                            </a>
                            <hr class="navbar-divider">
                            <a class="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <template v-if="!store.user">
                                <RouterLink class="button is-info" to="/login">
                                    <strong>
                                        Login
                                    </strong>
                                </RouterLink>
                                <RouterLink class="button is-light" to="/register">
                                    Register
                                </RouterLink>
                            </template>
                            <template v-else>

                                <button class="button is-light"
                                    @click="logout">Logout</button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/user'

const store = useAuthStore();
const { logoutAccount } = store;
const router = useRouter();

const logout = async () => {
    if (await logoutAccount())
        router.push('/')
}

</script>
