<template>
    <div class="section">


        <div class="columns is-mobile is-centered">
            <div class="column is-half">
                <nav class="panel">
                    <p class="panel-heading">
                        Todo List
                    </p>
                    <div class="panel-block">
                        <form @submit.prevent="addTodo"
                            class="field is-align-content-stretch has-addons control">
                            <div class="control has-icons-left fullwidth">
                                <input v-model="newTodo.title" type="text"
                                    class="input is-info " placeholder="Input task">
                                <span class="icon is-left">
                                    <i class="fa fa-pencil"></i>
                                </span>
                            </div>
                            <div class="control">
                                <button class="button is-info">
                                    <span class="icon">
                                        <i class="fa fa-plus"></i>
                                    </span>
                                    <span>Add</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <p class="panel-tabs">
                        <a class="is-active">All</a>
                        <a>Active</a>
                        <a>Completed</a>
                    </p>
                    <a class="panel-block" v-for="todo, index in todoStore?.todos"
                        :key="index"  @click="console.log(todo)">
                        <span class="panel-icon">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </span>
                        <!-- {{ todo.title }}  -->
                        {{ index }}
                    </a>

                </nav>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/user'
import { useTodosStore } from '@/stores/todo';

const store = useAuthStore();
const todoStore = useTodosStore();
const router = useRouter();



const defaultTodo = {
    title: '',
    finished: false
}

const newTodo = reactive(defaultTodo)

function resetForm() {
    Object.assign(newTodo, defaultTodo);
}

onMounted(() => {
    todoStore.fetchTodos();
})

// console.log(todoStore.todos);

console.log(newTodo);

// todoStore.init();
const addTodo = () => {
    if (newTodo.title === '') return;
    todoStore.addTodo(newTodo);
    resetForm();
    todoStore.fetchTodos();

}
console.log('dashboard');
</script>

<style>
.fullwidth {
    width: 100%;
}
</style>