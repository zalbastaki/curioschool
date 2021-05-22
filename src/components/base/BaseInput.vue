<template>
    <div class="base-input">
        <label v-if="label && type !== 'checkbox'" class="label" :for="name">
            {{ label }}
        </label>
        <component
            ref="input"
            class="input"
            :class="[type]"
            :is="component"
            :type="type === 'textarea' ? null : type"
            :name="name"
            :id="name"
            :min="min"
            :max="max"
            :placeholder="placeholder"
            :value="value"
            :checked="type === 'checkbox' ? value : null"
            @input="emitInput"
            @blur="emitBlur"
        >
            {{ type === 'textarea' ? value : '' }}
            <slot />
        </component>
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

            min: {
                type: Number,
                required: false,
                default() {
                    return null;
                },
            },

            max: {
                type: Number,
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

        computed: {
            component() {
                if (this.type === 'textarea') return 'textarea';
                if (this.type === 'select') return 'select';
                return 'input';
            },
        },

        methods: {
            emitInput() {
                const input = this.$refs.input;
                const isCheckbox = this.type === 'checkbox';
                const newValue = isCheckbox ? input.checked : input.value;
                this.$emit('input', newValue);
            },

            emitBlur() {
                const input = this.$refs.input;
                const isCheckbox = this.type === 'checkbox';
                const newValue = isCheckbox ? input.checked : input.value;
                this.$emit('blur', newValue);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .base-input {
        .label {
            display: block;
            font-weight: bold;
            text-transform: capitalize;
            margin-bottom: 8px;
        }

        .input {
            padding: 15px 12px;
            border-radius: $border-radius;
            border: $black solid 2px;
            font-size: 20px;
            background: #eeeeee;
            width: calc(100% - 24px);

            &::placeholder {
                font-family: $font-family;
            }

            &:focus {
                outline: none;
                background: #e1e1e1;
            }

            &.textarea,
            &.date,
            &.datetime-local {
                font-family: $font-family;
            }

            &.checkbox {
                display: inline-block;
                margin: 0;
                width: unset;
            }

            &.select {
                text-transform: capitalize;
            }

            &.textarea {
                resize: vertical;
            }
        }

        .checkbox-label {
            display: inline;
            margin-left: 2px;

            &:hover {
                cursor: pointer;
            }
        }
    }
</style>
