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

                                <button type="submit" class="button is-info"
                                    :class="{ 'is-loading': fetching }">
                                    <span class="icon">
                                        <i class="fa fa-plus"></i>
                                    </span>
                                    <span>Add</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <progress class="progress is-info" max="100"
                        v-if="todoStore.loadingTodos">30%</progress>
                    <!-- <template v-else> -->


                    <!-- <template v-else> -->
                    <div class="panel-block" v-if="todoStore.todosEmpty">
                        There is no todos. Add one
                    </div>
                    <p class="panel-tabs" v-else>
                        <a class="is-active">All</a>
                        <a>Active</a>
                        <a>Completed</a>
                    </p>

                    <a class="no-pointer panel-block is-align-items-center is-justify-content-space-between"
                        v-for="todo, index in todoStore?.todos" :key="index"
                        @click="console.log(todo)">
                        <div class="is-flex is-align-items-center">

                            <span class="panel-icon">

                                <i class="fa fa-check" aria-hidden="true"></i>
                            </span>
                            <span>
                                {{ todo.title }}

                            </span>
                        </div>
                        <div class="is-flex is-align-items-center">
                            <span @click.stop="" class="icon has-text-info mr-3">
                                <i class="fa fa-pencil"></i>
                            </span>
                            <button class="delete"
                                @click.stop="removeTodo(todo.id)"></button>
                        </div>



                    </a>
                    <!-- </template>
                    </template> -->



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
const fetching = ref(false)

const defaultTodo = {
    title: '',
    finished: false
}

const copyTodo = ref({})

const newTodo = reactive(defaultTodo)

function resetForm() {
    Object.assign(newTodo, defaultTodo);
}

onMounted(() => {
    todoStore.fetchTodos();
    console.log("onmounted");
})

// console.log(todoStore.todos);

console.log(newTodo);

// todoStore.init();
const addTodo = async () => {
    if (newTodo.title === '') return;
    fetching.value = true;
    await todoStore.addTodo(newTodo);
    defaultTodo.title = '';
    fetching.value = false;
    // await todoStore.fetchTodos();

}

const removeTodo = async (id) => {
    await todoStore.removeTodo(id)
    console.log(id);
    // await todoStore.fetchTodos();

}

const update = async () => {
    await todoStore.changeTodo('Lt8mlfyTGky5vUI2EQFc', 'New, changed title')
}

</script>

<style lang="scss" scoped>
.fullwidth {
    width: 100%;
}

.progress {
    height: 3px;
}
.no-pointer {
    cursor: auto;
}



.round {
    position: relative;
}

.round label {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 28px;
    left: 0;
    position: absolute;
    top: 0;
    width: 28px;
}

.round label:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: "";
    height: 6px;
    left: 7px;
    opacity: 0;
    position: absolute;
    top: 8px;
    transform: rotate(-45deg);
    width: 12px;
}

.round input[type="checkbox"] {
    visibility: hidden;
}

.round input[type="checkbox"]:checked+label {
    background-color: #66bb6a;
    border-color: #66bb6a;
}

.round input[type="checkbox"]:checked+label:after {
    opacity: 1;
}
</style>