<template>
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
        <TodoItem v-for="todo in filteredTodos" :todo="todo" @complete-todo="completeTodo"
            @remove-todo="removeTodo" @edit-todo="editTodo" />
    </nav>
</template>

<script setup>
import TodoItem from './TodoItem.vue';
import { computed, onMounted, reactive, ref } from 'vue'
import { useTodosStore } from '@/stores/todo';

const todoStore = useTodosStore();
const fetching = ref(false)
const currentTab = ref('All')
const tabs = ref(['All', 'Active', 'Completed'])

const defaultTodo = {
    title: '',
    finished: false
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