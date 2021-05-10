<template>
    <base-dashboard>
        <base-loader :show="!clas" />
        <div v-if="clas" class="student-class">
            <section class="top-bar">
                <div class="class-title">
                    <div
                        class="teacher-img"
                        :style="{ borderColor: clas.color }"
                    />
                    <base-text type="h1">{{ clas.name }}</base-text>
                </div>
                <progress-section />
            </section>
            <links-section :id="clas.id" :color="clas.color" />
        </div>
    </base-dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ProgressSection from '../../components/ProgressSection';
    import LinksSection from '../../components/class/LinksSection';

    export default {
        name: 'student-class',

        components: {
            ProgressSection,
            LinksSection,
        },

        props: {
            id: {
                type: String,
                required: true,
            },
        },

        computed: {
            ...mapGetters(['classes']),

            clas() {
                return this.classes.find(({ id }) => {
                    return id === this.id;
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .student-class {
        width: 100%;
        max-height: 100%;
        display: grid;
        grid-template-rows: auto 1fr 1fr;
        grid-template-columns:
            calc(15% - 20px) calc(30% - 20px) calc(25% - 20px)
            30%;
        gap: 20px;
        grid-template-areas:
            'top-bar top-bar top-bar top-bar'
            'links announcements leaderboard rewards'
            'links chat leaderboard rewards';
    }

    .top-bar {
        grid-area: top-bar;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .class-title {
            display: flex;
            align-items: center;
        }

        .teacher-img {
            height: 60px;
            width: 60px;
            border-radius: 50%;
            background-image: url('../../assets/images/placeholder-avatar.png');
            background-size: cover;
            background-position: center;
            border-width: 3px;
            border-style: solid;
            margin-right: 10px;
        }

        .h1 {
            font-size: 50px;
            text-transform: capitalize;
        }
    }

    .links {
        grid-area: links;
    }
</style>
