<template>
    <base-dashboard color="dark-orange">
        <base-loader :show="!currentClass" />
        <div v-if="currentClass" class="teacher-class">
            <base-text class="class-title" type="h1">
                {{ currentClass.name }}
            </base-text>
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
    import LinksSection from '../../components/student/class/LinksSection';
    import AnnouncementsSection from '../../components/student/class/AnnouncementsSection';
    import ChatSection from '../../components/student/class/ChatSection';
    import LeaderboardSection from '../../components/student/class/LeaderboardSection';
    import RewardsSection from '../../components/student/class/RewardsSection';

    export default {
        name: 'teacher-class',

        components: {
            LinksSection,
            AnnouncementsSection,
            ChatSection,
            LeaderboardSection,
            RewardsSection,
        },

        computed: {
            ...mapGetters(['currentClass', 'currentStudents']),
        },

        created() {
            this.updateCurrentClass();
            this.updateCurrentStudents();
        },

        methods: {
            ...mapActions(['updateCurrentClass', 'updateCurrentStudents']),
        },
    };
</script>

<style lang="scss" scoped>
    .teacher-class {
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

    .class-title {
        grid-area: top-bar;
        font-size: 50px;
        text-transform: capitalize;
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
