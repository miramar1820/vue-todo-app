<template>
    <label for="" class="label">{{ label }}</label>
    <div class="control has-icons-left">
        <input :type="type" :value="value" :placeholder="placeholder" class="input"
            :class="validClasses" :required="required" @input="updateInput"
            @blur="updateInput">

        <span class="icon is-small is-left">
            <i :class="iconClass"></i>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        label: { type: String, required: true },
        valid: { type: Boolean, required: true },
        required: { type: Boolean, default: false },
        type: { type: String, default: "text" },
        placeholder: { type: String, default: "" },
        iconClass: { type: String, default: '' },
        value: { type: String, required: true },
        //   activated: { type: Boolean, required: true },
        // modelValue: { type: String, required: true },
    },
    data() {
        return {
            activated: this.value !== "",
        };
    },
    computed: {
        validClasses() {
            return {
                'is-danger': !this.valid && this.activated
            }
            // return !this.valid && this.activated
            //     ? "is-danger"
            //     : "";
        },
        validValue() {
            return this.valid ? 'circle-check' : 'circle-exclamation'
        }
    },
    methods: {
        updateInput(e) {
            // console.log("here");
            this.activated = true;
            this.$emit("updatemyinput", e.target.value);
        },
    },
}


</script>