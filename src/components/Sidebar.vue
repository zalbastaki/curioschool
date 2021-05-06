<template>
    <div class="sidebar">
        <div>
            <div class="profile">
                <div class="avatar" />
                <div class="name">
                    {{ profile.first_name }} {{ profile.last_name }}
                </div>
            </div>

            <div class="nav">
                <router-link
                    v-for="(item, index) in navItems"
                    :key="index"
                    class="nav-item"
                    :class="[currentPath === item.path ? 'selected' : '']"
                    :to="{ path: item.path }"
                >
                    {{ item.label }}
                </router-link>
            </div>
        </div>

        <base-button
            class="logout-btn"
            type="button"
            @click="logout"
            color="dark-orange"
        >
            Logout
        </base-button>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'sidebar',

        computed: {
            ...mapGetters(['profile', 'classes']),

            navItems() {
                const classes = this.classes.map(({ id, name }) => {
                    return {
                        label: name,
                        path: `/student-class/${id}`,
                    };
                });

                return [
                    {
                        label: 'home',
                        path: '/student-home',
                    },
                    ...classes,
                    {
                        label: 'settings',
                        path: '/student-settings',
                    },
                ];
            },

            currentPath() {
                return this.$router.currentRoute.path;
            },
        },

        methods: {
            ...mapActions(['logout']),
        },
    };
</script>

<style lang="scss" scoped>
    .sidebar {
        padding: 30px 0 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: $white;

        .profile {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .avatar {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                background-image: url('../assets/images/placeholder-avatar.png');
                background-size: cover;
                margin-bottom: 20px;
            }

            .name {
                font-size: 25px;
            }
        }

        .nav {
            margin-top: 30px;

            .nav-item {
                display: block;
                text-transform: uppercase;
                font-weight: bold;
                font-size: 30px;
                margin-right: 20px;
                padding: 20px 0 20px 35px;
                color: $white;
                text-decoration: none;

                &.selected,
                &:hover {
                    border-top: 3px solid $white;
                    border-bottom: 3px solid $white;
                    border-right: 3px solid $white;
                    border-top-right-radius: 50px;
                    border-bottom-right-radius: 50px;
                }

                &.selected {
                    background: darken($purple, 10%);
                }

                &:hover {
                    background: darken($purple, 5%);
                }
            }
        }

        .logout-btn {
            margin: 0 20px;
        }
    }
</style>
