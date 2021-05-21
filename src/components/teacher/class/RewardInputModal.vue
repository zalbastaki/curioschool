<template>
    <base-modal ref="addReward" heading="Add Reward">
        <template v-slot:body>
            <base-input
                type="text"
                name="reward"
                label="reward"
                placeholder="Reward"
                v-model="reward.label"
            />
            <base-input
                type="number"
                name="price"
                label="price"
                placeholder="Price"
                v-model="reward.price"
            />
        </template>
        <template v-slot:footer>
            <base-button
                type="button"
                button-type="submit"
                color="dark-orange"
                @click="addReward"
            >
                Add
            </base-button>
        </template>
    </base-modal>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'reward-input-modal',

        data() {
            return {
                reward: {
                    label: '',
                    price: 0,
                },
            };
        },

        computed: {
            ...mapGetters(['currentClass']),
        },

        methods: {
            ...mapActions(['updateClassDoc']),

            addReward() {
                this.reward.price = parseInt(this.reward.price);
                const clas = this.currentClass;
                clas.rewards.push(this.reward);
                this.updateClassDoc(clas);
                this.$refs.addReward.closeModal();
            },

            openModal() {
                this.$refs.addReward.openModal();
            },
        },
    };
</script>

<style lang="scss" scoped>
    .modal {
        .base-input:not(:first-of-type) {
            margin-top: 15px;
        }
    }
</style>
