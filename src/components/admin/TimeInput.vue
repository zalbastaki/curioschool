<template>
    <div class="time-input">
        <label class="label" for="label">
            Time
        </label>
        <div class="inputs-container">
            <base-input
                type="datetime-local"
                :name="`start_time-${index}`"
                label="start time"
                :value="formatDate(value.start_time)"
                @input="val => emitInput(val, 'start_time')"
            />
            <base-input
                type="datetime-local"
                :name="`end_time-${index}`"
                label="end time"
                :value="formatDate(value.end_time)"
                @input="val => emitInput(val, 'end_time')"
            />
            <base-input
                type="select"
                :name="`repeats-${index}`"
                label="repeats"
                placeholder="repeats"
                :value="value.repeats"
                @input="val => emitInput(val, 'repeats')"
            >
                <option
                    v-for="(val, index) in repeats"
                    :key="index"
                    :value="val"
                    :selected="val === value.repeats"
                >
                    {{ val }}
                </option>
            </base-input>
            <button class="delete-btn" type="button" @click="$emit('delete')">
                <fa-icon :icon="['fas', 'trash-alt']" aria-label="delete" />
            </button>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: 'time-input',

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

        data() {
            return {
                repeats: ['none', 'daily', 'weekly', 'monthly'],
            };
        },

        methods: {
            formatDate(date) {
                let datejs = new Date(date);
                if (isNaN(datejs)) datejs = date.toDate();
                return moment(datejs).format('YYYY-MM-DD[T]HH:mm');
            },

            emitInput(val, fieldName) {
                const value = {
                    start_time: this.formatDate(this.value.start_time),
                    end_time: this.formatDate(this.value.end_time),
                    repeats: this.value.repeats,
                };
                if (fieldName === 'start_time' || fieldName === 'end_time') {
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
    .time-input {
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
