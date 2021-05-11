<template>
    <base-section
        class="rewards"
        heading="rewards"
        :background="`${color}44`"
        :border="color"
    >
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
                class="buy-btn"
                type="button"
                @click="buy(reward)"
                color="yellow"
                :width="$mq === 'tablet' ? '100px' : '140px'"
                height="40px"
            >
                Buy Reward
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

    export default {
        name: 'rewards-section',

        computed: {
            ...mapGetters(['currentClass']),

            color() {
                return this.currentClass.color;
            },
        },

        methods: {
            ...mapActions(['buyReward']),

            buy(reward) {
                this.buyReward(reward).then(() => {
                    this.$refs.rewardSuccess.openModal(
                        `Yay! You've bought the reward '${reward.label}' for ${reward.price} coins. Check your rewards page to see all of your rewards.`
                    );
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .rewards {
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
