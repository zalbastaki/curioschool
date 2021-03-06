<template>
    <div class="reward-input">
        <label class="label" for="label">
            Reward
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
                v-if="includeClass"
                type="select"
                :name="`class-${index}`"
                label="class"
                placeholder="class"
                :value="value.class.id"
                @input="val => emitInput(val, 'class')"
            >
                <option
                    v-for="(clas, index) in adminClasses"
                    :key="index"
                    :value="clas.id"
                    :selected="value.class.id === clas.id"
                >
                    {{ clas.name }}
                </option>
            </base-input>
            <base-input
                type="number"
                :name="`price-${index}`"
                label="price"
                placeholder="price"
                :value="value.price"
                @input="val => emitInput(val, 'price')"
            />
            <button class="delete-btn" type="button" @click="$emit('delete')">
                <fa-icon :icon="['fas', 'trash-alt']" aria-label="delete" />
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'reward-input',

        props: {
            value: {
                type: Object,
                required: true,
            },

            index: {
                type: Number,
                required: true,
            },

            includeClass: {
                type: Boolean,
                required: false,
                default() {
                    return true;
                },
            },
        },

        computed: {
            ...mapGetters(['adminClasses']),
        },

        methods: {
            emitInput(val, fieldName) {
                if (!this.includeClass) {
                    const value = {
                        label: this.value.label,
                        price: this.value.price,
                    };
                    if (fieldName === 'price') {
                        value[fieldName] = val ? parseInt(val) : val;
                    } else {
                        value[fieldName] = val;
                    }
                    return this.$emit('input', value);
                }

                const value = {
                    class: this.value.class,
                    label: this.value.label,
                    price: parseInt(this.value.price),
                };
                if (fieldName === 'class') {
                    const clas = this.adminClasses.find(({ id }) => id === val);
                    value[fieldName] = {
                        id: clas.id,
                        name: clas.name,
                        color: clas.color,
                    };
                } else if (fieldName === 'price') {
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
    .reward-input {
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
