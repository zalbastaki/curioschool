<template>
    <transition name="fade">
        <div class="modal" v-if="show">
            <div class="backdrop" @click="closeModal()" />

            <div class="dialog">
                <div class="header">
                    <slot name="header" />
                    <base-text v-if="heading" type="h3">
                        {{ heading }}
                    </base-text>
                    <button type="button" class="close" @click="closeModal()">
                        <fa-icon
                            :icon="['fas', 'times']"
                            aria-label="close modal"
                        />
                    </button>
                </div>

                <div class="body">
                    <slot name="body" />
                    <base-text type="p">{{ message }}</base-text>
                </div>

                <div class="footer">
                    <slot name="footer" />
                    <base-button
                        v-if="!$slots['footer']"
                        type="button"
                        button-type="submit"
                        :color="buttonColor"
                        @click="closeModal()"
                    >
                        {{ buttonText }}
                    </base-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'base-modal',

        props: {
            heading: {
                type: String,
                required: false,
                default() {
                    return null;
                },
            },

            buttonText: {
                type: String,
                required: false,
                default() {
                    return 'ok';
                },
            },

            buttonColor: {
                type: String,
                required: false,
                default() {
                    return 'dark-orange';
                },
            },
        },

        data() {
            return {
                show: false,
                message: null,
            };
        },

        methods: {
            closeModal() {
                this.message = null;
                this.show = false;
                document
                    .querySelector('body')
                    .classList.remove('overflow-hidden');
            },

            openModal(message) {
                this.message = message;
                this.show = true;
                document.querySelector('body').classList.add('overflow-hidden');
            },
        },
    };
</script>

<style lang="scss" scoped>
    .modal {
        overflow-x: hidden;
        overflow-y: auto;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9;
        display: flex;

        .backdrop {
            background-color: rgba(0, 0, 0, 0.3);
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
        }

        .dialog {
            background-color: #ffffff;
            position: relative;
            width: 600px;
            margin: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            border-radius: $border-radius;
            z-index: 2;
            @media screen and (max-width: 992px) {
                width: 90%;
            }
        }

        .close {
            width: 30px;
            height: 30px;
            background: none;
            border: none;
            font-size: 30px;
            position: absolute;
            right: 20px;
            top: 20px;
        }

        .header {
            padding: 30px 20px 10px;
            width: calc(100% - 40px);
            text-align: center;
            position: relative;
        }

        .body {
            padding: 30px 50px 30px;
            overflow: auto;
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }

        .footer {
            padding: 10px 20px 30px;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>
