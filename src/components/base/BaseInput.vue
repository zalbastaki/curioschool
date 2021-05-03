<template>
    <component
        ref="input"
        class="input"
        :class="[type]"
        :is="type === 'textarea' ? 'textarea' : 'input'"
        :type="type === 'textarea' ? null : type"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :value="value"
        :checked="type === 'checkbox' ? value : null"
        @input="emitInput"
    />
</template>

<script>
    export default {
        name: 'base-input',

        props: {
            type: {
                type: String,
                required: true,
            },

            name: {
                type: String,
                required: false,
                default() {
                    return null;
                },
            },

            id: {
                type: String,
                required: false,
                default() {
                    return null;
                },
            },

            placeholder: {
                type: String,
                required: false,
                default() {
                    return null;
                },
            },

            value: {
                required: false,
                default() {
                    return null;
                },
            },
        },

        methods: {
            emitInput() {
                const input = this.$refs.input;
                const isCheckbox = this.type === 'checkbox';
                const newValue = isCheckbox ? input.checked : input.value;
                this.$emit('input', newValue);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .input {
        padding: 15px 12px;
        border-radius: $border-radius;
        border: $black solid 2px;
        font-size: 20px;
        background: #f7f7f7;

        &::placeholder {
            font-family: $font-family;
        }

        &:focus {
            outline: none;
            background: #e1e1e1;
        }
    }
</style>
