<template>
    <div class="assessment-question-input">
        <label class="label" for="question">
            Question
        </label>
        <div class="inputs-container">
            <base-input
                type="text"
                :name="`question-${index}-${assessmentIndex}`"
                label="question"
                placeholder="question"
                :value="value.question"
                @input="val => emitInput(val, 'question')"
            />
            <base-input
                type="number"
                :name="`order-${index}-${assessmentIndex}`"
                label="question order"
                placeholder="question order"
                :value="value.order"
                @input="val => emitInput(val, 'order')"
            />
            <base-input
                type="checkbox"
                :name="`required-${index}-${assessmentIndex}`"
                label="Required"
                :value="value.required"
                @input="val => emitInput(val, 'required')"
            />
            <base-input
                type="select"
                :name="`type-${index}-${assessmentIndex}`"
                label="question type"
                placeholder="question type"
                :value="value.type"
                @input="val => emitInput(val, 'type')"
            >
                <option
                    v-for="(type, index) in questionTypes"
                    :key="index"
                    :value="type.value"
                    :selected="value.type === type.value"
                >
                    {{ type.label }}
                </option>
            </base-input>
            <base-input
                v-if="value.type !== 'select'"
                type="text"
                :name="`placeholder-${index}-${assessmentIndex}`"
                label="placeholder"
                placeholder="placeholder"
                :value="value.placeholder"
                @input="val => emitInput(val, 'placeholder')"
            />
            <div v-if="value.type === 'select'" class="options-input">
                <label class="label" for="option-0">
                    Options
                </label>
                <div
                    v-for="(option, index) in value.options"
                    :key="`${value.options[index]}-${index}-${assessmentIndex}`"
                    class="option"
                >
                    <base-input
                        type="text"
                        :name="`option-${index}-${assessmentIndex}`"
                        :label="`Option ${index + 1}`"
                        :placeholder="`Option ${index + 1}`"
                        :value="value.options[index]"
                        @blur="val => handleOptionInput(val, index)"
                    />
                    <button
                        class="delete-option"
                        type="button"
                        @click="deleteOption(index)"
                    >
                        <fa-icon
                            :icon="['fas', 'trash-alt']"
                            aria-label="delete"
                        />
                    </button>
                </div>
                <base-button
                    type="button"
                    button-type="button"
                    width="100%"
                    height="30px"
                    class="add-btn"
                    @click="addOption"
                >
                    + Add an option
                </base-button>
            </div>
            <base-input
                v-if="value.type === 'select'"
                type="checkbox"
                :name="`multi-${index}-${assessmentIndex}`"
                label="Multiple choice"
                :value="value.multi"
                @input="val => emitInput(val, 'multi')"
            />
            <base-input
                v-if="value.type === 'select' && value.multi"
                type="number"
                :name="`limit-${index}-${assessmentIndex}`"
                label="choice limit"
                placeholder="choice limit"
                :value="value.limit"
                @input="val => emitInput(val, 'limit')"
            />
            <button class="delete-btn" type="button" @click="$emit('delete')">
                <fa-icon :icon="['fas', 'trash-alt']" aria-label="delete" />
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'assessment-question-input',

        props: {
            value: {
                type: Object,
                required: true,
            },

            index: {
                type: Number,
                required: true,
            },

            assessmentIndex: {
                type: Number,
                required: true,
            },
        },

        data() {
            return {
                questionTypes: [
                    { label: 'select', value: 'select' },
                    { label: 'short answer', value: 'short_answer' },
                    { label: 'long answer', value: 'long_answer' },
                ],
            };
        },

        methods: {
            handleOptionInput(val, index) {
                let options = [...this.value.options];
                options[index] = val;
                this.emitInput(options, 'options');
            },

            addOption() {
                const options = [...this.value.options, ''];
                this.emitInput(options, 'options');
            },

            deleteOption(index) {
                let options = [...this.value.options];
                options.splice(index, 1);
                this.emitInput(options, 'options');
            },

            emitInput(val, fieldName) {
                let value = {
                    question: this.value.question,
                    order: parseInt(this.value.order),
                    required: this.value.required,
                    type: this.value.type,
                    placeholder: this.value.placeholder,
                    options: this.value.options,
                    multi: this.value.multi,
                    limit: parseInt(this.value.limit),
                };

                if (fieldName === 'order' || fieldName === 'limit') {
                    value[fieldName] = val ? parseInt(val) : val;
                } else {
                    value[fieldName] = val;
                }

                return this.$emit('input', value);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .assessment-question-input {
        margin-top: 15px;

        .label {
            display: block;
            font-weight: bold;
            text-transform: capitalize;
            margin-bottom: 8px;
        }

        .inputs-container {
            padding: 15px 12px;
            border-radius: $border-radius;
            border: $black solid 2px;
            position: relative;
        }

        .base-input {
            margin-top: 10px;

            /deep/ .input {
                width: calc(100% - 30px);

                &.select {
                    width: 100%;
                }
            }
        }

        .options-input {
            .label {
                margin-bottom: 0;
                margin-top: 10px;
            }

            .option {
                display: flex;

                .base-input {
                    flex: 1;
                }

                .delete-option {
                    margin-top: 35px;
                    background: none;
                    border: none;
                    font-size: 20px;
                    color: $dark-orange;
                    cursor: pointer;
                }
            }
        }

        .add-btn {
            margin-top: 15px;
            font-size: 18px;
            text-transform: none;
        }

        .delete-btn {
            position: absolute;
            right: 10px;
            top: 10px;
            background: none;
            border: none;
            font-size: 20px;
            color: $dark-orange;
            cursor: pointer;
        }
    }
</style>
