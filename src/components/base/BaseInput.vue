<template>
    <div class="base-input">
        <component
            ref="input"
            class="input"
            :class="[type]"
            :is="type === 'textarea' ? 'textarea' : 'input'"
            :type="type === 'textarea' ? null : type"
            :name="name"
            :id="name"
            :placeholder="placeholder"
            :value="value"
            :checked="type === 'checkbox' ? value : null"
            @input="emitInput"
        />
        <label
            v-if="label && type === 'checkbox'"
            class="checkbox-label"
            :class="value ? 'done' : ''"
            :for="name"
        >
            {{ label }}
        </label>
    </div>
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

            placeholder: {
                type: String,
                required: false,
                default() {
                    return null;
                },
            },

            label: {
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
    .base-input {
        .input {
            padding: 15px 12px;
            border-radius: $border-radius;
            border: $black solid 2px;
            font-size: 20px;
            background: #f7f7f7;
            width: 100%;

            &::placeholder {
                font-family: $font-family;
            }

            &:focus {
                outline: none;
                background: #e1e1e1;
            }

            &.checkbox {
                display: inline-block;
                margin: 0;
                width: unset;
            }
        }

        .checkbox-label {
            display: inline-block;
            margin-left: 5px;

            &:hover {
                cursor: pointer;
            }

            &.done {
                text-decoration: line-through;
            }
        }
    }
</style>
