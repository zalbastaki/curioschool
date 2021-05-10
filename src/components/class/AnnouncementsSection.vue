<template>
    <base-section
        class="announcements"
        heading="Announcements"
        :background="`${color}44`"
        :border="color"
    >
        <div
            v-for="(announcement, index) in currentClass.announcements"
            :key="index"
            class="announcement"
            :style="{ borderColor: color }"
        >
            <div
                class="date"
                :style="{ background: `${color}44`, borderColor: color }"
            >
                <base-text type="h3">
                    {{ getDay(announcement.timestamp) }}
                </base-text>
                <base-text type="h5">
                    {{ getMonth(announcement.timestamp) }}
                </base-text>
            </div>
            <div class="announcement-content">
                {{ announcement.label }}
            </div>
        </div>
    </base-section>
</template>

<script>
    import { mapGetters } from 'vuex';
    import moment from 'moment';

    export default {
        name: 'announcements-section',

        computed: {
            ...mapGetters(['currentClass']),

            color() {
                return this.currentClass.color;
            },
        },

        methods: {
            getDay(timestamp) {
                const date = timestamp.toDate();
                return moment(date).format('DD');
            },

            getMonth(timestamp) {
                const date = timestamp.toDate();
                return moment(date).format('MMM');
            },

            getTime(timestamp) {
                const date = timestamp.toDate();
                return moment(date).format('h:mm a');
            },
        },
    };
</script>

<style lang="scss" scoped>
    .announcements {
        .announcement {
            display: flex;
            border-width: 2px;
            border-style: solid;
            border-radius: 10px;
            margin-bottom: 10px;

            .date {
                border-right-width: 2px;
                border-right-style: solid;
                padding: 3px 8px 8px;
                text-align: center;
            }

            .announcement-content {
                padding: 8px;
            }
        }
    }
</style>
