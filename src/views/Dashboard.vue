<template>
    <div>
        {{ store.user ? store.user : 'nope' }}
        <hr>
        {{ store.isLoggedIn }}
        <hr>
        <div>
            <h3>Add new todo</h3>
            <input type="text" v-model="newTodo.title">
            <button @click="addTodo">Add</button>
        </div>
        <div>
            <h3>Todos</h3>
            <ul>
                <li v-for="todo, index in todoStore.todos" :key="index">
                    {{ todo.title }}
                </li>
            </ul>
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
    todoStore.addTodo(newTodo);
    resetForm();
    todoStore.fetchTodos();
}
console.log('dashboard');
</script>
