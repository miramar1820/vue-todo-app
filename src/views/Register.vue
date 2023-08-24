<template>
    <div class="is-flex fullheight is-align-items-center">
        <div class="container">
            <div class="columns is-centered">

                <div class="column is-5-tablet is-4-desktop is-3-widescreen">


                    <form @submit.prevent="registerUser" class="box">
                        <div class="block">
                            <h1 class="title is-4 has-text-centered">Register</h1>
                        </div>

                        <!-- <template v-for="val, i in validation">
                            <div class="field">
                                <Input :value="val.value" :label="val.label" :valid="val.valid"
                                    @updatemyinput="validate(i, $event)" :iconClass="val.iconClass" />
                            </div>
                        </template> -->

                        <div class="field">
                            <label class="label">Full Name</label>
                            <div class="control has-icons-left">
                                <input type="text" v-model="state.fullName" placeholder="e.g. Bob Smith" class="input"
                                    :class="{ 'is-danger': v$.fullName.$error }" @blur="v$.fullName.$touch">
                                <span class="icon is-small is-left">
                                    <i class="fa fa-user"></i>
                                </span>
                            </div>
                            <!-- <div v-for="(error, index) in v$.fullName.$errors"
                                :key="index">
                                {{ error.$message }}
                            </div> -->
                        </div>
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control has-icons-left">
                                <input type="text" v-model="state.email" placeholder="e.g. bobsmith@gmail.com" class="input"
                                    :class="{ 'is-danger': v$.email.$error }" @blur="v$.email.$touch">
                                <span class="icon is-small is-left">
                                    <i class="fa fa-envelope"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control has-icons-left">
                                <input type="password" v-model="state.password" placeholder="*******" class="input"
                                    :class="{ 'is-danger': v$.password.$error }" @blur="v$.password.$touch">
                                <span class="icon is-small is-left">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Confirm Password</label>
                            <div class="control has-icons-left">
                                <input type="password" v-model="state.confirm" placeholder="*******" class="input"
                                    :class="{ 'is-danger': v$.confirm.$error }" @blur="v$.confirm.$touch">
                                <span class="icon is-small is-left">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </div>
                            <!-- <div v-for="(error, index) in v$.confirm.$errors" :key="index">
                                {{ error.$message }}
                            </div> -->
                        </div>
                        <div class="error">
                            <span class="is-danger" v-if="store.error"> {{ store.error }}</span>
                        </div>
                        <div class="field mt-5">
                            <button class="button is-success is-fullwidth" :class="{ 'is-loading': store.loading }">
                                <span class="icon">
                                    <i class="fa fa-user-plus"></i>
                                </span>
                                <span>Register</span>
                            </button>
                        </div>
                        <div class="field has-text-centered">
                            <div class="is-size-7">
                                Have an account?
                                <RouterLink to="/login" class="link"> Login
                                </RouterLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/user'
import Input from '@/components/UI/Input.vue';

const store = useAuthStore();
const router = useRouter();

store.reset();

console.log('register');

const state = reactive({
    fullName: '',
    email: '',
    password: '',
    confirm: '',
})

const rules = {
    fullName: { required },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    confirm: { required, sameAs: sameAs(computed(() => state.password)) },
}

const v$ = useVuelidate(rules, state)
// console.log(v$);

// watch(state, (val) => {

//     console.log(val);
// })


const registerUser = async () => {
    // const inv = v$.value.$invalid;
    const valid = await v$.value.$validate();
    // console.log(valid);
    if (!valid) return;
    if (await store.createAccount(state.email, state.password, state.fullName)) {
        router.replace('/login')
    }
}


// const formReady = computed(() => {
//     console.log("msg every", msg.every((i) => i === ''));
//     return msg.every(i => i === '')
// })

// watch(email, (val) => {
//     email.value = val;
//     validateEmail(val)
// })

</script>
