<template>
    <nav class="navbar is-warning is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <div class="navbar-item">
                    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="28" height="28" />
                </div>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
                    data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div class="navbar-menu">
                <div class="navbar-end">

                    <RouterLink to="/" class="navbar-item">Home</RouterLink>
                    <RouterLink to="/about" class="navbar-item">About</RouterLink>
                    <RouterLink v-if="store.isLoggedIn" to="/dashboard" class="navbar-item">
                        Dashboard
                    </RouterLink>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            More
                        </a>
                        <div class="navbar-dropdown is-boxed">
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


                    <template v-if="!store.isLoggedIn">
                        <div class="navbar-item">
                            <div class="buttons">
                                <RouterLink class="button is-info" to="/login">
                                    <strong>
                                        Login
                                    </strong>
                                </RouterLink>
                                <RouterLink class="button is-light" to="/register">
                                    Register
                                </RouterLink>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <!-- <div class="navbar-item">
                            <div class="dropdown is-right is-active">
                                <div class="dropdown-trigger">
                                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu6">
                                        <span>{{ store.user.displayName }}</span>
                                        <span class="icon is-small">
                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>
                                <div class="dropdown-menu" role="menu">
                                    <div class="dropdown-content">

                                        <a href="#" class="dropdown-item is-active">
                                            Active dropdown item
                                        </a>
                                        <a href="#" class="dropdown-item">
                                            Other dropdown item
                                        </a>
                                        <hr class="dropdown-divider">
                                        <a class="dropdown-item" @click="logout">
                                            <span class="icon">
                                                <i class="fa fa-sign-out"></i>
                                            </span>
                                            <span>Logout</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <div class="navbar-item has-dropdown is-hoverable ">
                            <a class="navbar-link">
                                <span class="icon"><i class="fa fa-lg fa-user"></i></span>
                            </a>
                            <div class="navbar-dropdown is-boxed is-right">
                                <a class="navbar-item">
                                    <span class="icon">
                                        <i class="fa fa-list-ol"></i>
                                    </span>
                                    <span>My todos</span>
                                </a>
                                <hr class="navbar-divider">
                                <a class="navbar-item">
                                    <span class="icon">
                                        <i class="fa fa-cog"></i>
                                    </span>
                                    <span>Settings</span>
                                </a>
                                <hr class="navbar-divider">
                                <a class="navbar-item" @click="logout">
                                    <span class="icon">
                                        <i class="fa fa-sign-out"></i>
                                    </span>
                                    <span>Logout</span>
                                </a>
                            </div>
                        </div>
                        <!-- <button class="button is-light" :class="store.loading ? 'is-loading' : ''" @click="logout">
                            <span class="icon">
                                <i class="fa fa-sign-out"></i>
                            </span>
                            <span>Logout</span>
                        </button> -->
                    </template>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/user'

const store = useAuthStore();
const { logoutAccount } = store;
const router = useRouter();

const logout = async () => {
    if (confirm("Are you sure?"))
        if (await logoutAccount()) {
            router.push('/')
        }
}

</script>
