<template>
    <div class="assessment-input">
        <label class="label" for="name">
            Assessment
        </label>
        <div class="inputs-container">
            <base-input
                type="text"
                :name="`name-${assessmentIndex}`"
                label="name"
                placeholder="assessment name"
                :value="value.name"
                @input="val => emitInput(val, 'name')"
            />
            <base-input
                type="textarea"
                :name="`description-${assessmentIndex}`"
                label="description"
                placeholder="assessment description"
                :value="value.description"
                @input="val => emitInput(val, 'description')"
            />
            <base-input
                type="select"
                :name="`type-${assessmentIndex}`"
                label="type"
                placeholder="type"
                :value="value.type"
                @input="val => emitInput(val, 'type')"
            >
                <option
                    v-for="(type, index) in assessmentTypes"
                    :key="index"
                    :value="type"
                    :selected="type === value.type"
                >
                    {{ type }}
                </option>
            </base-input>
            <base-input
                type="datetime-local"
                :name="`due_date-${assessmentIndex}`"
                label="due date"
                placeholder="due date"
                :value="formatDate(value.due_date)"
                @input="val => emitInput(val, 'due_date')"
            />
            <base-input
                type="number"
                :name="`total_grade-${assessmentIndex}`"
                :min="1"
                label="highest possible grade"
                placeholder="Highest possible grade"
                :value="value.total_grade"
                @input="val => emitInput(val, 'total_grade')"
            />
            <base-input
                type="number"
                :name="`weight-${assessmentIndex}`"
                :min="0"
                label="weighting"
                placeholder="Weighting"
                :value="value.weight"
                @input="val => emitInput(val, 'weight')"
            />
            <base-input
                type="number"
                :name="`coins-${assessmentIndex}`"
                :min="0"
                label="highest possible coins"
                placeholder="Highest possible coins"
                :value="value.coins"
                @input="val => emitInput(val, 'coins')"
            />
            <base-input
                type="number"
                :name="`points-${assessmentIndex}`"
                :min="0"
                label="highest possible points"
                placeholder="Highest possible points"
                :value="value.points"
                @input="val => emitInput(val, 'points')"
            />
            <base-input
                type="number"
                :name="`submissions-limit-${assessmentIndex}`"
                :min="0"
                label="how many times can a student submit? (enter 0 for unlimited)"
                placeholder="Submissions limit"
                :value="value.submissions_limit"
                @input="val => emitInput(val, 'submissions_limit')"
            />
            <base-input
                type="number"
                :name="`time-limit-${assessmentIndex}`"
                :min="0"
                label="time limit (in minutes) (0 for unlimited)"
                placeholder="Time limit (minutes)"
                :value="value.time_limit"
                @input="val => emitInput(val, 'time_limit')"
            />
            <assessment-question-input
                :assessmentIndex="assessmentIndex"
                v-for="(question, index) in value.questions"
                :key="`question-${index}`"
                :index="index"
                v-model="value.questions[index]"
                @delete="deleteQuestion(index)"
            />
            <base-button
                type="button"
                button-type="button"
                width="100%"
                height="30px"
                class="add-btn"
                @click="addQuestion"
            >
                + Add a question
            </base-button>
            <button class="delete-btn" type="button" @click="$emit('delete')">
                <fa-icon :icon="['fas', 'trash-alt']" aria-label="delete" />
            </button>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import AssessmentQuestionInput from './AssessmentQuestionInput';

    export default {
        name: 'assessment-input',

        components: {
            AssessmentQuestionInput,
        },

        props: {
            value: {
                type: Object,
                required: true,
            },

            assessmentIndex: {
                type: Number,
                required: true,
            },
        },

        data() {
            return {
                assessmentTypes: [
                    'homework',
                    'classwork',
                    'project',
                    'quiz',
                    'test',
                ],
            };
        },

        methods: {
            formatDate(date) {
                let datejs = new Date(date);
                if (isNaN(datejs)) datejs = date.toDate();
                return moment(datejs).format('YYYY-MM-DD[T]HH:mm');
            },

            addQuestion() {
                let questions = [...this.value.questions];
                questions.push({
                    question: '',
                    order: this.value.questions.length,
                    required: true,
                    type: 'short_answer',
                    placeholder: '',
                    options: [],
                    multi: false,
                    limit: 0,
                });
                this.emitInput(questions, 'questions');
            },

            deleteQuestion(index) {
                let questions = [...this.value.questions];
                questions.splice(index, 1);
                this.emitInput(questions, 'questions');
            },

            emitInput(val, fieldName) {
                const value = {
                    id: this.value.id,
                    name: this.value.name,
                    description: this.value.description,
                    type: this.value.type,
                    due_date: this.formatDate(this.value.due_date),
                    total_grade: parseInt(this.value.total_grade),
                    weight: parseInt(this.value.weight),
                    coins: parseInt(this.value.coins),
                    points: parseInt(this.value.points),
                    submissions_limit: parseInt(this.value.submissions_limit),
                    time_limit: parseInt(this.value.submissions_limit),
                    questions: this.value.questions,
                };
                if (fieldName === 'due_date') {
                    value[fieldName] = this.formatDate(val);
                } else if (
                    fieldName === 'total_grade' ||
                    fieldName === 'weight' ||
                    fieldName === 'coins' ||
                    fieldName === 'points' ||
                    fieldName === 'submissions_limit' ||
                    fieldName === 'time_limit'
                ) {
                    value[fieldName] = val ? parseInt(val) : val;
                } else {
                    value[fieldName] = val;
                }
                this.$emit('input', value);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .assessment-input {
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

        .assessment-question-input {
            margin-top: 10px;
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
