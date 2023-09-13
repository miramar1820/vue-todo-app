<script>
export default {
    props: ['checked', 'id'],
}
</script>
<template>
    <div class="round">
        <input type="checkbox" :checked="checked" :id="id" @change="$emit('completeTodo', id)" />
        <label :for="id"></label>
    </div>
</template>

<style lang="scss">
.round {
    position: relative;

    label {
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 50%;
        cursor: pointer;
        height: 25px;
        left: 0;
        position: absolute;
        top: 0;
        width: 25px;

        &:after {
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
    }

    input[type="checkbox"] {
        visibility: hidden;

        &:checked+label {
            background-color: #66bb6a;
            border-color: #66bb6a;

            &:after {
                opacity: 1;
            }
        }
    }
}
</style>