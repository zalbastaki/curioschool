<template>
    <base-modal ref="studentModal" class="student-modal" :heading="name">
        <template v-slot:body>
            <base-text class="info-item" type="p">
                <span class="label">Total Points: </span>
                {{ student.profile.points }}
            </base-text>
            <base-text class="info-item" type="p">
                <span class="label">Class Points: </span>
                {{ student.classPoints }}
            </base-text>
            <base-text class="info-item" type="p">
                <span class="label">Coins: </span>
                {{ student.profile.coins }}
            </base-text>
            <div class="info-item rewards">
                <base-text class="label" type="p">Rewards: </base-text>
                <base-text
                    v-if="student.profile.rewards.length === 0"
                    class="no-msg"
                    type="p"
                >
                    {{ name }} doesn't have any rewards.
                </base-text>
                <div
                    v-for="(reward, index) in student.profile.rewards"
                    :key="`reward-${index}`"
                    class="reward"
                >
                    <base-text type="p">{{ reward.label }}</base-text>
                    <base-button
                        type="button"
                        button-type="button"
                        color="yellow"
                        height="25px"
                        width="150px"
                        @click="useReward(reward)"
                    >
                        Use Reward
                    </base-button>
                </div>
            </div>
        </template>
        <template v-slot:footer>
            <form @submit.prevent="addCoinsPoints">
                <base-input
                    type="number"
                    name="coins"
                    :min="0"
                    label="Add Coins"
                    placeholder="Coins"
                    v-model="data.coins"
                />
                <base-button
                    type="button"
                    button-type="submit"
                    color="yellow"
                    height="25px"
                    width="150px"
                >
                    Add Coins
                </base-button>
                <base-input
                    type="number"
                    name="points"
                    :min="0"
                    label="Add Points"
                    placeholder="Points"
                    v-model="data.points"
                />
                <base-button
                    type="button"
                    button-type="submit"
                    color="yellow"
                    height="25px"
                    width="150px"
                >
                    Add Points
                </base-button>
            </form>
        </template>
    </base-modal>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'student-modal',

        data() {
            return {
                student: {},
                data: {
                    coins: 0,
                    points: 0,
                },
            };
        },

        computed: {
            name() {
                if (!this.student.profile) return '';
                return `${this.student.profile.first_name} ${this.student.profile.last_name}`;
            },
        },

        methods: {
            ...mapActions(['addStudentCoinsPoints', 'useStudentReward']),

            useReward(reward) {
                this.useStudentReward({
                    studentId: this.student.id,
                    reward,
                });
                this.$refs.studentModal.closeModal();
            },

            addCoinsPoints() {
                this.addStudentCoinsPoints({
                    studentId: this.student.id,
                    data: this.data,
                });
                this.$refs.studentModal.closeModal();
                this.reset();
            },

            openModal(student) {
                this.student = student;
                this.$refs.studentModal.openModal();
            },

            reset() {
                this.data = {
                    coins: 0,
                    points: 0,
                };
            },
        },
    };
</script>

<style lang="scss" scoped>
    .student-modal {
        /deep/ .body {
            padding: 30px 50px 15px !important;
            text-align: center;

            .info-item {
                margin-bottom: 5px;

                .label {
                    font-weight: bold;
                }
            }

            .rewards {
                border: 2px solid $black;
                border-radius: $border-radius;
                margin-top: 10px;

                .label {
                    padding: 10px;
                }

                .no-msg {
                    opacity: 60%;
                    font-size: 16px;
                    font-style: italic;
                    padding: 10px;
                }

                .reward {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    text-align: left;
                    padding: 10px;
                    border-top: 2px solid $black;

                    .button {
                        font-size: 16px;
                        text-transform: unset;
                    }
                }
            }
        }

        /deep/ .footer {
            width: calc(100% - 110px);
            padding: 0 20px 50px !important;

            .base-input:not(:first-of-type) {
                margin-top: 15px;
            }

            .button {
                margin-top: 8px;
                font-size: 16px;
                text-transform: unset;
            }
        }
    }
</style>
