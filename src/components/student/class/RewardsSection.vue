<template>
    <base-section
        class="rewards"
        heading="rewards"
        :background="`${color}44`"
        :border="color"
    >
        <template v-if="role === 'teacher'">
            <base-button
                type="button"
                button-type="button"
                color="yellow"
                class="add-btn"
                height="40px"
                width="100%"
                @click="openAddModal"
            >
                Add a reward
            </base-button>
            <reward-input-modal ref="addModal" />
        </template>
        <div
            v-for="(reward, index) in currentClass.rewards"
            :key="index"
            class="reward"
            :style="{ borderColor: color }"
        >
            <div class="label">{{ reward.label }}</div>
            <div class="price">
                <fa-icon
                    class="icon"
                    :icon="['fas', 'coins']"
                    aria-label="coins"
                />
                {{ reward.price }}
            </div>
            <base-button
                v-if="role === 'student'"
                class="buy-btn"
                type="button"
                @click="buy(reward)"
                color="yellow"
                :width="$mq === 'tablet' ? '80px' : '100px'"
                height="40px"
            >
                Buy
            </base-button>
            <base-button
                v-if="role === 'teacher'"
                class="buy-btn"
                type="button"
                @click="deleteReward(index)"
                color="dark-orange"
                :width="$mq === 'tablet' ? '80px' : '100px'"
                height="30px"
            >
                Delete
            </base-button>
        </div>
        <base-modal
            ref="rewardSuccess"
            heading="Reward Bought!"
            button-color="yellow"
        />
    </base-section>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import RewardInputModal from '../../teacher/class/RewardInputModal';

    export default {
        name: 'rewards-section',

        components: {
            RewardInputModal,
        },

        computed: {
            ...mapGetters(['currentClass', 'role']),

            color() {
                return this.currentClass.color;
            },
        },

        methods: {
            ...mapActions(['buyReward', 'updateClassDoc']),

            buy(reward) {
                this.buyReward({ reward, clas: this.currentClass }).then(() => {
                    this.$refs.rewardSuccess.openModal(
                        `Yay! Check your rewards page to see all of your rewards.`
                    );
                });
            },

            openAddModal() {
                this.$refs.addModal.openModal();
            },

            deleteReward(index) {
                const clas = this.currentClass;
                clas.rewards.splice(index, 1);
                this.updateClassDoc(clas);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .rewards {
        .add-btn {
            font-size: 16px;
            text-transform: none;
            margin-bottom: 10px;
        }

        .reward {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 10px 5px;
            margin-bottom: 10px;
            border-width: 3px;
            border-style: solid;
            border-radius: 15px;

            .price {
                margin: 10px 0;

                .icon {
                    color: $yellow;
                }
            }

            .buy-btn {
                font-size: 16px;
                margin: 5px 0 0;
            }
        }
    }
</style>
