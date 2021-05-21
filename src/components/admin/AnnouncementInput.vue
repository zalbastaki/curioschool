<template>
    <div class="announcement-input">
        <label class="label" for="label">
            Announcement
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
                type="datetime-local"
                :name="`timestamp-${index}`"
                label="timestamp"
                placeholder="timestamp"
                :value="formatDate(value.timestamp)"
                @input="val => emitInput(val, 'timestamp')"
            />
            <button
                v-if="allowDelete"
                class="delete-btn"
                type="button"
                @click="$emit('delete')"
            >
                <fa-icon :icon="['fas', 'trash-alt']" aria-label="delete" />
            </button>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: 'announcement-input',

        props: {
            value: {
                type: Object,
                required: true,
            },

            index: {
                type: Number,
                required: true,
            },

            allowDelete: {
                type: Boolean,
                required: false,
                default() {
                    return true;
                },
            },
        },

        methods: {
            formatDate(date) {
                let datejs = new Date(date);
                if (isNaN(datejs)) datejs = date.toDate();
                return moment(datejs).format('YYYY-MM-DD[T]HH:mm');
            },

            emitInput(val, fieldName) {
                const value = {
                    label: this.value.label,
                    timestamp: this.formatDate(this.value.timestamp),
                };
                if (fieldName === 'timestamp') {
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
    .announcement-input {
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
