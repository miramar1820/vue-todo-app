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
                            <label for="" class="label">Full Name</label>
                            <div class="control has-icons-left">
                                <input type="text" v-model="v$.fullName.$model"
                                    placeholder="e.g. John Doe" class="input">
                                <span class="icon is-small is-left">
                                    <i class="fa fa-user"></i>
                                </span>
                            </div>
                            <div v-for="(error, index) in v$.fullName.$errors"
                                :key="index">
                                {{ error.$message }}
                            </div>
                        </div>
                        <div class="field">
                            <label for="" class="label">Email</label>
                            <div class="control has-icons-left">
                                <input type="text" v-model="v$.email.$model"
                                    placeholder="e.g. bobsmith@gmail.com"
                                    class="input">
                                <span class="icon is-small is-left">
                                    <i class="fa fa-envelope"></i>
                                </span>
                            </div>
                            <div v-for="(error, index) in v$.email.$errors"
                                :key="index">
                                {{ error.$message }}
                            </div>
                        </div>
                        <div class="field">
                            <label for="" class="label">Password</label>
                            <div class="control has-icons-left">
                                <input type="password"
                                    v-model="state.password.password"
                                    placeholder="*******" class="input">
                                <span class="icon is-small is-left">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </div>
                            <div v-for="(error, index) in v$.password.password.$errors"
                                :key="index">
                                {{ error.$message }}
                            </div>
                        </div>
                        <div class="field">
                            <label for="" class="label">Confirm Password</label>
                            <div class="control has-icons-left">
                                <input type="password"
                                    v-model="state.password.confirm"
                                    placeholder="*******" class="input">
                                <span class="icon is-small is-left">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </div>
                            <div v-for="(error, index) in v$.password.confirm.$errors"
                                :key="index">
                                {{ error.$message }}
                            </div>
                        </div>
                        <div class="error">
                            <span class="is-danger"> {{ store.error ?
                                store.error : '' }}</span>
                        </div>
                        <div class="field mt-5">
                            <button class="button is-success is-fullwidth"
                                :class="store.loading ? 'is-loading' : ''">
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
import { ref, watch, reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/user'
import Input from '@/components/UI/Input.vue';

const store = useAuthStore();
const router = useRouter();

const state = reactive({
    fullName: '',
    email: '',
    password: {
        password: '',
        confirm: '',
    },
})

const rules = {
    fullName: { required },
    email: { required, email },
    password: {
        password: { required, minLength: minLength(6) },
        confirm: { required, sameAs: sameAs(state.password.password) },
    },
}

const v$ = useVuelidate(rules, state)
console.log(v$);

const validation = reactive(
    [
        {
            label: "Fullname",
            value: "",
            pattern: /^[a-zA-Z ]{2,30}$/,
            iconClass: 'fa fa-user'
        },
        {
            label: "Email",
            value: "",
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            iconClass: 'fa fa-envelope'
        },
        {
            label: "Password",
            value: "",
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            iconClass: 'fa fa-lock'
        },
        {
            label: "Confirm",
            value: "",
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            iconClass: 'fa fa-lock'
        },
    ]
)

let pass = validation.filter(ob => ob.label === 'Password')
console.log("pass", pass);

validation.forEach((field) => {
    field.valid = false;
    // field.activated = false;
})

const registerUser = async () => {
    v$.value.$validate();
    if (v$.value.$error) {
        alert("Have errors!!!");
    }
    // if (await store.createAccount(email.value, password.value))
    //     router.replace('/login')
}


// const formReady = computed(() => {
//     console.log("msg every", msg.every((i) => i === ''));
//     return msg.every(i => i === '')
// })

// watch(email, (val) => {
//     email.value = val;
//     validateEmail(val)
// })

const validate = (i, val) => {
    let field = validation[i];
    field.value = val.trim();
    // field.activated = true;
    field.valid = field.pattern.test(field.value);
}


</script>
