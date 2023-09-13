<script>
import TodoCheckbox from './TodoCheckbox.vue';
import TodoItemInput from './TodoItemInput.vue';

export default {
    data() {
        return {
            editingTodo: null,
        };
    },
    props: ['todo'],
    emits: ['completeTodo', 'editTodo', 'openTodoEdit', 'removeTodo'],
    methods: {
        openTodoEdit(id) {
            this.editingTodo = id;
        },
        saveTodo(id, title) {
            this.$emit('editTodo', id, title)
            this.editingTodo = null
        }
    },
    components: { TodoItemInput, TodoCheckbox }
}
</script>
<template>
    <a class="no-pointer panel-block is-align-items-center is-justify-content-space-between">
        <div class="is-flex is-align-items-center fullwidth mr-5">
            <TodoCheckbox @complete-todo="$emit('completeTodo', todo.id)" :id="todo.id" :checked="todo.finished"
                class="mr-3" />
            <TodoItemInput :id="todo.id" :editing="editingTodo" v-model:title="todo.title" :finished="todo.finished" />
        </div>
        <div class="is-flex is-align-items-center">
            <span v-if="editingTodo !== todo.id" @click.stop="openTodoEdit(todo.id)"
                class="pointer icon has-text-info mr-3">
                <i class="fa fa-pencil"></i>
            </span>
            <span v-else class="pointer icon has-text-info mr-3" @click.stop="saveTodo(todo.id, todo.title)">
                <i class="fa fa-save"></i>
            </span>
            <button class="delete" @click.stop="$emit('removeTodo', todo.id)"></button>
        </div>
    </a>
</template>

