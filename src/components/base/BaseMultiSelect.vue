<template>
    <div class="base-multiselect">
        <label v-if="inputLabel" class="label">{{ inputLabel }}</label>
        <multiselect
            :value="value"
            @input="val => $emit('input', val)"
            :multiple="true"
            :searchable="false"
            :options="options"
            :label="label"
            :customLabel="customLabel"
            :track-by="trackBy"
            :closeOnSelect="closeOnSelect"
            class="multiselect-input"
        />
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';

    export default {
        name: 'base-multi-select',

        components: {
            Multiselect,
        },

        props: {
            value: {
                required: true,
            },

            options: {
                type: Array,
                required: true,
            },

            inputLabel: {
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

            customLabel: {
                type: Function,
                required: false,
                default() {
                    return null;
                },
            },

            trackBy: {
                type: String,
                required: false,
                default() {
                    return null;
                },
            },

            closeOnSelect: {
                type: Boolean,
                required: false,
                default() {
                    return true;
                },
            },
        },
    };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
    .base-multiselect {
        .label {
            display: block;
            font-weight: bold;
            text-transform: capitalize;
            margin-bottom: 8px;
        }

        .multiselect-input {
            /deep/ .multiselect__tags {
                display: flex;
                align-items: center;
                min-height: 60px;
                border-radius: $border-radius;
                border: $black solid 2px;
                font-size: 20px;
                background: #eeeeee;
                width: 100%;
                text-transform: capitalize;
            }

            /deep/ .multiselect__content-wrapper {
                border-radius: $border-radius;
                border: $black solid 2px;
                font-size: 20px;
                background: #eeeeee;
                border-top: none;
            }

            /deep/ .multiselect__option {
                text-transform: capitalize;
            }

            /deep/ .multiselect__select {
                right: 5px;
                top: 10px;
            }
        }
    }
</style>
