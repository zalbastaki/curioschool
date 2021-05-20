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
                <div class="text">{{ announcement.label }}</div>
                <div class="time">
                    <fa-icon
                        :icon="['fas', 'clock']"
                        aria-label="time"
                        :style="{ color }"
                    />
                    {{ getTime(announcement.timestamp) }}
                </div>
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
            getDate(date) {
                let datejs = new Date(date);
                if (isNaN(datejs)) datejs = date.toDate();
                return datejs;
            },

            getDay(timestamp) {
                const date = this.getDate(timestamp);
                return moment(date).format('DD');
            },

            getMonth(timestamp) {
                const date = this.getDate(timestamp);
                return moment(date).format('MMM');
            },

            getTime(timestamp) {
                const date = this.getDate(timestamp);
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
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-right-width: 2px;
                border-right-style: solid;
                padding: 3px 8px 8px;
                text-align: center;
            }

            .announcement-content {
                flex: 1;
                padding: 8px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .text {
                    font-weight: bold;
                }

                .time {
                    align-self: flex-end;
                    margin-top: 10px;
                    font-size: 12px;
                }
            }
        }
    }
</style>
