<template>
    <span v-if="editing !== id" :class="finishedClass">
        {{ title }}
    </span>
    
    <div v-else class="fullwidth">
        <input type="text" class="input" :value="title" @input="$emit('update:title', $event.target.value)">
    </div>
</template>

<script>
export default {
    props: ['editing', 'id', 'finished', 'title'],
    computed: {
        finishedClass() {
            return { 'has-text-grey-light is-line-through': this.finished }
        }
    }
}
</script>