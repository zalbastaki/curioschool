<template>
    <base-dashboard color="yellow">
        <base-loader :show="!currentAdminTeacher" />
        <div v-if="currentAdminTeacher" class="admin-teacher">
            <router-link class="back-btn" :to="`/admin-teachers`">
                <fa-icon :icon="['fas', 'arrow-left']" aria-label="back" />
            </router-link>
            <base-text type="h3">{{ name }}</base-text>
            <form @submit.prevent="handleSubmit">
                <base-input
                    type="text"
                    name="first_name"
                    id="first_name"
                    label="first name"
                    placeholder="first name"
                    v-model="currentAdminTeacher.profile.first_name"
                />
                <base-input
                    type="text"
                    name="last_name"
                    label="last name"
                    placeholder="last name"
                    v-model="currentAdminTeacher.profile.last_name"
                />
                <base-multi-select
                    :value="classes"
                    @input="handleClassInput"
                    :options="adminClasses"
                    :customLabel="classLabel"
                    track-by="id"
                    input-label="classes"
                    class="classes-input"
                />
                <base-button type="button" button-type="submit" color="orange">
                    Save
                </base-button>
            </form>
        </div>
        <base-modal
            ref="saveSuccess"
            heading="Successfully saved changes."
            button-color="yellow"
        />
    </base-dashboard>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'admin-teacher',

        props: {
            id: {
                type: String,
                required: true,
            },
        },

        computed: {
            ...mapGetters(['currentAdminTeacher', 'adminClasses']),

            name() {
                const teacher = this.currentAdminTeacher.profile;
                return `${teacher.first_name} ${teacher.last_name}`;
            },

            classes() {
                return this.currentAdminTeacher.profile.classes.map(clas => {
                    return this.adminClasses.find(({ id }) => id === clas);
                });
            },
        },

        mounted() {
            this.updateCurrentAdminTeacher();
        },

        methods: {
            ...mapActions(['updateCurrentAdminTeacher', 'updateTeacherDoc']),

            classLabel({ name, level }) {
                return `${level} - ${name}`;
            },

            handleClassInput(value) {
                const classes = value.map(({ id }) => id);
                this.currentAdminTeacher.profile.classes = [...classes];
                const levels = value.map(({ level }) => level);
                this.currentAdminTeacher.profile.levels = [...levels];
            },

            handleSubmit() {
                this.updateTeacherDoc().then(() => {
                    this.$refs.saveSuccess.openModal();
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .admin-teacher {
        .back-btn {
            color: $black;
            font-size: 30px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 3px solid $orange;
            background: lighten($orange, 25%);
            margin-bottom: 15px;
            display: inline-flex;
            align-items: center;
            justify-content: center;

            &:hover {
                margin-left: -3px;
            }
        }

        .h3 {
            text-transform: capitalize;
        }

        form {
            display: flex;
            flex-direction: column;

            .button {
                align-self: center;
                margin-top: 15px;
            }
        }

        .base-input {
            margin-top: 15px;

            /deep/ .input {
                width: calc(100% - 30px);

                &.select {
                    width: 100%;
                }
            }
        }

        .classes-input {
            margin-top: 15px;
        }
    }
</style>
