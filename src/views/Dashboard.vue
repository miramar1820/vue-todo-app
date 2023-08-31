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
                            <!-- <label class="checkbox">
                                <input type="checkbox" :checked="todo.finished">
                                <span class="checkmark"></span>
                            </label> -->
                            <span class="panel-icon"
                                :class="{ 'has-text-danger': todo.finished }"
                                @click="completeTodo(todo.id)">
                                <span>
                                    <label class="check">
                                        <input type="checkbox">
                                        <!-- <i class="fa fa-check fa-lg" aria-hidden="true"></i> -->
                                    </label>
                                </span>
                            </span>
                            <span
                                :class="{ 'has-text-grey-light is-line-through': todo.finished }">
                                {{ todo.title }}

                            </span>
                        </div>
                        <div class="is-flex is-align-items-center">
                            <span @click.stop=""
                                class="pointer icon has-text-info mr-3">
                                <i class="fa fa-pencil"></i>
                            </span>
                            <button class="delete"
                                @click.stop="removeTodo(todo.id)"></button>
                        </div>
                    </a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodosStore } from '@/stores/todo';

const todoStore = useTodosStore();
const router = useRouter();
const fetching = ref(false)

const defaultTodo = {
    title: '',
    finished: false
}

const newTodo = reactive(defaultTodo)

onMounted(() => {
    todoStore.fetchTodos();
    console.log("onmounted");
})

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
}

const completeTodo = async (id) => {
    await todoStore.finishTodo(id)
    console.log(id);
}


</script>

<style lang="scss">

.check {
    input[type=checkbox] {
        visibility: hidden;
    }
    background-color: #333;
}
.fullwidth {
    width: 100%;
}

.progress {
    height: 3px;
}

.no-pointer {
    cursor: auto;
}

.pointer {
    cursor: pointer;
}

.is-line-through {
    text-decoration: line-through;
}

.checkbox {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
}

/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
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