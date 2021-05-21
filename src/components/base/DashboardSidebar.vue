<template>
    <div class="sidebar" :class="[$mq, textColor]">
        <div>
            <div v-if="profile" class="profile">
                <div class="avatar" :class="[buttonColor]" />
                <div class="name">
                    {{ profile.first_name }} {{ profile.last_name }}
                </div>
            </div>

            <div class="nav">
                <router-link
                    v-for="(item, index) in navItems"
                    :key="index"
                    class="nav-item"
                    :class="[
                        currentPath === item.path ? 'selected' : '',
                        color,
                        textColor,
                    ]"
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
            :color="buttonColor"
            :width="$mq === 'tablet' ? '160px' : '190px'"
        >
            Logout
        </base-button>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'sidebar',

        props: {
            color: {
                type: String,
                required: false,
                default() {
                    return 'purple';
                },
            },

            buttonColor: {
                type: String,
                required: false,
                default() {
                    return 'dark-orange';
                },
            },

            textColor: {
                type: String,
                required: false,
                default() {
                    return 'white';
                },
            },
        },

        computed: {
            ...mapGetters(['role', 'profile', 'classes']),

            navItems() {
                if (this.role === 'admin') {
                    return [
                        {
                            label: 'home',
                            path: '/admin-home',
                        },
                        {
                            label: 'students',
                            path: '/admin-students',
                        },
                        {
                            label: 'teachers',
                            path: '/admin-teachers',
                        },
                        {
                            label: 'classes',
                            path: '/admin-classes',
                        },
                    ];
                }

                const classes = this.classes.map(({ id, name }) => {
                    return {
                        label: name,
                        path: `/${this.role}-class/${id}`,
                    };
                });

                let sidebar = [
                    {
                        label: 'home',
                        path: `/${this.role}-home`,
                    },
                    ...classes,
                    {
                        label: 'attendance',
                        path: `/${this.role}-attendance`,
                    },
                    {
                        label: 'grades',
                        path: `/${this.role}-grades`,
                    },
                ];

                if (this.role === 'teacher') return sidebar;

                sidebar.push({
                    label: 'rewards',
                    path: '/student-rewards',
                });

                return sidebar;
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
        padding: 50px 0 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &.white {
            color: $white;
        }

        &.black {
            color: $black;
        }

        .profile {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .avatar {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background-image: url('../../assets/images/placeholder-avatar.png');
                background-size: cover;
                margin-bottom: 20px;

                &.dark-purple {
                    border: 5px solid $dark-purple;
                }

                &.purple {
                    border: 5px solid $purple;
                }

                &.yellow {
                    border: 5px solid $yellow;
                }

                &.orange {
                    border: 5px solid $orange;
                }

                &.dark-orange {
                    border: 5px solid $dark-orange;
                }
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
                font-size: 22px;
                margin-right: 25px;
                padding: 15px 0 15px 35px;
                text-decoration: none;

                &.white {
                    color: $white;

                    &.selected,
                    &:hover {
                        border-top: 3px solid $white;
                        border-bottom: 3px solid $white;
                        border-right: 3px solid $white;
                    }
                }

                &.black {
                    color: $black;

                    &.selected,
                    &:hover {
                        border-top: 3px solid $black;
                        border-bottom: 3px solid $black;
                        border-right: 3px solid $black;
                    }
                }

                &.selected,
                &:hover {
                    border-top-right-radius: 50px;
                    border-bottom-right-radius: 50px;
                }

                &.selected {
                    &.dark-purple {
                        background: darken($dark-purple, 10%);

                        &:hover {
                            background: darken($dark-purple, 10%);
                        }
                    }

                    &.purple {
                        background: darken($purple, 10%);

                        &:hover {
                            background: darken($purple, 10%);
                        }
                    }

                    &.yellow {
                        background: darken($yellow, 10%);

                        &:hover {
                            background: darken($yellow, 10%);
                        }
                    }

                    &.orange {
                        background: darken($orange, 10%);

                        &:hover {
                            background: darken($orange, 10%);
                        }
                    }

                    &.dark-orange {
                        background: darken($dark-orange, 10%);

                        &:hover {
                            background: darken($dark-orange, 10%);
                        }
                    }
                }

                &:hover {
                    &.dark-purple {
                        background: darken($dark-purple, 5%);
                    }
                    &.purple {
                        background: darken($purple, 5%);
                    }
                    &.yellow {
                        background: darken($yellow, 5%);
                    }
                    &.orange {
                        background: darken($orange, 5%);
                    }
                    &.dark-orange {
                        background: darken($dark-orange, 5%);
                    }
                }
            }
        }

        .logout-btn {
            margin: 0 25px;
        }

        &.tablet {
            padding: 30px 0 30px;

            .profile {
                .avatar {
                    width: 80px;
                    height: 80px;
                    margin-bottom: 10px;
                }

                .name {
                    font-size: 20px;
                }
            }

            .nav {
                margin-top: 20px;

                .nav-item {
                    font-size: 20px;
                    margin-right: 20px;
                    padding: 15px 0 15px 25px;
                }
            }

            .logout-btn {
                margin: 0 15px;
            }
        }
    }
</style>
