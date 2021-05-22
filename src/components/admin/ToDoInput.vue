<template>
    <div class="to-do-input">
        <label class="label" for="label">
            To Do
        </label>
        <div class="inputs-container">
            <base-input
                type="text"
                :name="`label-${index}`"
                label="label"
                placeholder="label"
                :value="value.label"
                @input="val => emitInput(val, 'label')"
            />
            <base-input
                type="select"
                :name="`classColor-${index}`"
                label="class"
                placeholder="class"
                :value="value.classColor"
                @input="val => emitInput(val, 'classColor')"
            >
                <option
                    v-for="(clas, index) in adminClasses"
                    :key="index"
                    :value="clas.color"
                    :selected="value.classColor === clas.color"
                >
                    {{ clas.name }}
                </option>
            </base-input>
            <base-input
                type="date"
                :name="`date-${index}`"
                label="date"
                placeholder="date"
                :value="formatDate(value.date)"
                @input="val => emitInput(val, 'date')"
            />
            <base-input
                type="checkbox"
                :name="`done-${index}`"
                label="Done"
                :value="value.done"
                @input="val => emitInput(val, 'done')"
            />
            <button class="delete-btn" type="button" @click="$emit('delete')">
                <fa-icon :icon="['fas', 'trash-alt']" aria-label="delete" />
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import moment from 'moment';

    export default {
        name: 'to-do-input',

        props: {
            value: {
                type: Object,
                required: true,
            },

            index: {
                type: Number,
                required: true,
            },
        },

        computed: {
            ...mapGetters(['adminClasses']),
        },

        methods: {
            formatDate(date) {
                let datejs = new Date(date);
                if (isNaN(datejs)) datejs = date.toDate();
                return moment(datejs).format('YYYY-MM-DD');
            },

            emitInput(val, fieldName) {
                const value = {
                    id: this.value.id,
                    classColor: this.value.classColor,
                    date: this.formatDate(this.value.date),
                    done: this.value.done,
                    label: this.value.label,
                };
                if (fieldName === 'date') {
                    value[fieldName] = this.formatDate(val);
                } else {
                    value[fieldName] = val;
                }
                this.$emit('input', value);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .to-do-input {
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
