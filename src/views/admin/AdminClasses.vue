<template>
    <base-dashboard color="yellow">
        <base-loader :show="!currentAdminClasses" />
        <div v-if="currentAdminClasses" class="admin-classes">
            <div class="top-bar">
                <base-text type="h2">Classes</base-text>
                <select
                    v-model="selectedLevel"
                    class="level-select"
                    name="levels"
                    id="levels"
                >
                    <option value="all">all</option>
                    <option
                        v-for="(level, index) in levels"
                        :key="index"
                        :value="level"
                    >
                        {{ level }}
                    </option>
                </select>
            </div>
            <base-text v-if="currentAdminClasses.length === 0" type="p">
                There are currently no classes registered!
            </base-text>
            <template v-else>
                <section class="classes">
                    <router-link
                        v-for="(clas, index) in currentAdminClasses"
                        :key="index"
                        class="clas"
                        :to="`/admin-clas/${clas.id}`"
                    >
                        <div class="avatar" />
                        <base-text type="p">{{ clas.level }}</base-text>
                        <base-text type="p">{{ clas.name }}</base-text>
                    </router-link>
                </section>
            </template>
            <base-button type="button" @click="addClass" width="300px">
                + Add Class
            </base-button>
        </div>
    </base-dashboard>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'admin-classes',

        computed: {
            ...mapGetters([
                'adminClasses',
                'adminLevelSelected',
                'currentAdminClasses',
                'levels',
            ]),

            selectedLevel: {
                get() {
                    return this.adminLevelSelected;
                },

                set(val) {
                    this.updateAdminLevelSelected(val);
                },
            },
        },

        mounted() {
            this.updateCurrentAdminClasses();
        },

        methods: {
            ...mapActions([
                'updateCurrentAdminClasses',
                'updateAdminLevelSelected',
            ]),

            addClass() {
                // TO DO
            },
        },
    };
</script>

<style lang="scss" scoped>
    .admin-classes {
        display: flex;
        flex-direction: column;

        .top-bar {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .level-select {
            align-self: flex-end;
            text-transform: capitalize;
            font-size: 20px;
            font-weight: bold;
            color: $white;
            padding: 10px 10px 10px 15px;
            border: none;
            border-radius: 18px;
            background: $purple;
            box-shadow: 3px 3px darken($purple, 10%);

            &:hover {
                cursor: pointer;
            }
        }

        .classes {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 10px;

            .clas {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px 10px;
                border: 3px solid $orange;
                border-radius: $border-radius;
                background: lighten($orange, 25%);
                font-weight: bold;
                text-align: center;
                color: $black;
                text-decoration: none;

                .avatar {
                    width: 100px;
                    height: 100px;
                    border: 3px solid $orange;
                    border-radius: 50%;
                    background-image: url('../../assets/images/placeholder-avatar.png');
                    background-size: cover;
                    margin-bottom: 10px;
                }

                .p {
                    font-size: 18px;
                    text-transform: capitalize;
                }

                &:hover {
                    background: lighten($orange, 15%);
                }
            }
        }

        .button {
            margin-top: 20px;
            align-self: center;
        }
    }
</style>
