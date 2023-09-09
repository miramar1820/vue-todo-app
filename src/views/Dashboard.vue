<template>
    <div class="section">
        <div class="columns is-centered">
            <div class="column is-8-tablet is-6-desktop is-5-widescreen">
                <nav class="panel">
                    <p class="panel-heading">
                        Todo List ({{ todoStore.todosLength }})
                    </p>
                    <div class="panel-block">
                        <form @submit.prevent="addTodo" class="field is-align-content-stretch has-addons control">
                            <div class="control has-icons-left fullwidth">
                                <input v-model="newTodo.title" type="text" ref="mainInput" class="input is-info"
                                    placeholder="Input task">
                                <span class="icon is-left">
                                    <i class="fa fa-pencil"></i>
                                </span>
                            </div>
                            <div class="control">
                                <button type="submit" class="button is-info" :class="{ 'is-loading': fetching }">
                                    <span class="icon">
                                        <i class="fa fa-plus"></i>
                                    </span>
                                    <span>Add</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <progress class="progress is-info" max="100" v-if="todoStore.loadingTodos">30%</progress>
                    <div class="panel-block" v-if="todoStore.todosEmpty">
                        There is no todos. Add one
                    </div>
                    <p class="panel-tabs" v-else>
                        <a :class="{ 'is-active': tab === currentTab }" v-for="tab, index in tabs" :key="index"
                            @click="currentTab = tab">{{ tab }}</a>
                    </p>

                    <a class="no-pointer panel-block is-align-items-center is-justify-content-space-between"
                        v-for="todo, index in filteredTodos" :key="index" @click="console.log(todo)">
                        <!-- todoStore?.todos -->
                        <div class="is-flex is-align-items-center fullwidth mr-5">
                            <div class="round mr-3">
                                <input type="checkbox" :checked="todo.finished" :id="todo.id"
                                    @change="completeTodo(todo.id)" />
                                <label :for="todo.id"></label>
                            </div>
                            <span v-if="editingTodo !== todo.id"
                                :class="{ 'has-text-grey-light is-line-through': todo.finished }">
                                {{ todo.title }}

                            </span>
                            <div v-else class="fullwidth">
                                <input type="text" class="input" v-model="todo.title">
                            </div>
                        </div>
                        <div class="is-flex is-align-items-center">
                            <span v-if="editingTodo !== todo.id" @click.stop="openTodoEdit(todo.id)"
                                class="pointer icon has-text-info mr-3">
                                <i class="fa fa-pencil"></i>
                            </span>
                            <span v-else class="pointer icon has-text-info mr-3" @click.stop="editTodo(todo.id, todo.title)">
                                <i class="fa fa-save"></i>
                            </span>

                            <button class="delete" @click.stop="removeTodo(todo.id)"></button>



                        </div>
                    </a>
                </nav>
            </div>
        </div>
        <!-- <ul>
            <li v-for="todo in filteredTodos" :key="todo.id">{{ todo.title }} {{
                todo.finished }}</li>
        </ul> -->
        <!-- {{ auth.currentUser }} -->
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useTodosStore } from '@/stores/todo';

// import { auth } from '@/firebase/config'
const todoStore = useTodosStore();
const fetching = ref(false)
const currentTab = ref('All')
const tabs = ref(['All', 'Active', 'Completed'])
const editingTodo = ref(null)

const defaultTodo = {
    title: '',
    finished: false
}


const openTodoEdit = (id) => {
    editingTodo.value = id;
}

const newTodo = reactive(defaultTodo)

const mainInput = ref(null)

onMounted(async () => {
    await todoStore.fetchTodos();
    mainInput.value.focus();
})

const addTodo = async () => {
    if (newTodo.title === '') return;
    fetching.value = true;
    // console.log("add exposed");
    await todoStore.addTodo(newTodo);
    defaultTodo.title = '';
    fetching.value = false;
}

const removeTodo = async (id) => {
    await todoStore.removeTodo(id)
    // console.log(id);
}

const completeTodo = async (id) => {
    await todoStore.finishTodo(id)
    // console.log(id);
}

const editTodo = async (id, newTitle) => {
    await todoStore.changeTodo(id, newTitle)
    editingTodo.value = null
}

const filteredTodos = computed(
    () => todoStore.todos.filter(item => {
        switch (currentTab.value) {
            case 'Active':
                return item.finished === false
            case 'Completed':
                return item.finished === true
            default:
                return item;
        }
    })
)
</script>

<style lang="scss">
.round {
    position: relative;
}

.round label {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 25px;
    left: 0;
    position: absolute;
    top: 0;
    width: 25px;
}

.round label:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: "";
    height: 6px;
    left: 6px;
    opacity: 0;
    position: absolute;
    top: 7px;
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

.fullwidth {
    width: 100%;
}

.progress {
    height: 3px;
}

.no-pointer {
    cursor: auto !important;
}

.pointer {
    cursor: pointer;
}

.is-line-through {
    text-decoration: line-through;
}
</style>