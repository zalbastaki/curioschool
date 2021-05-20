<template>
    <base-dashboard>
        <base-loader :show="!currentClass" />
        <div v-if="currentClass" class="student-class">
            <section class="top-bar">
                <div class="class-title">
                    <div
                        class="teacher-img"
                        :style="{ borderColor: currentClass.color }"
                    />
                    <base-text type="h1">{{ currentClass.name }}</base-text>
                </div>
                <progress-section />
            </section>
            <links-section />
            <announcements-section />
            <chat-section />
            <leaderboard-section />
            <rewards-section />
        </div>
    </base-dashboard>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import ProgressSection from '../../components/student/ProgressSection';
    import LinksSection from '../../components/student/class/LinksSection';
    import AnnouncementsSection from '../../components/student/class/AnnouncementsSection';
    import ChatSection from '../../components/student/class/ChatSection';
    import LeaderboardSection from '../../components/student/class/LeaderboardSection';
    import RewardsSection from '../../components/student/class/RewardsSection';

    export default {
        name: 'student-class',

        components: {
            ProgressSection,
            LinksSection,
            AnnouncementsSection,
            ChatSection,
            LeaderboardSection,
            RewardsSection,
        },

        computed: {
            ...mapGetters(['currentClass']),
        },

        created() {
            this.updateCurrentClass();
        },

        methods: {
            ...mapActions(['updateCurrentClass']),
        },
    };
</script>

<style lang="scss" scoped>
    .student-class {
        width: 100%;
        max-height: 100%;
        display: grid;
        grid-template-rows: auto minmax(0, 1fr) minmax(0, 1fr);
        grid-template-columns: auto 3fr 1fr 2fr;
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

    .announcements {
        grid-area: announcements;
    }

    .chat {
        grid-area: chat;
    }

    .leaderboard {
        grid-area: leaderboard;
    }

    .rewards {
        grid-area: rewards;
    }
</style>
