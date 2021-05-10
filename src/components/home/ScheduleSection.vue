<template>
    <section class="schedule">
        <base-text type="h3">Schedule</base-text>
        <base-text v-if="schedule.length === 0" type="p">
            You've got no classes today!
        </base-text>
        <div
            v-for="(item, index) in schedule"
            :key="index"
            class="schedule-item"
            :class="classNow(item) ? 'now' : ''"
            :style="{ background: `${item.color}44`, borderColor: item.color }"
        >
            <div
                class="time"
                :style="{ borderRight: `2px solid ${item.color}` }"
            >
                <div>{{ getFormattedTime(item.start_time) }}</div>
                <div>{{ getFormattedTime(item.end_time) }}</div>
            </div>
            <div class="name">{{ item.class }}</div>
        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';
    import moment from 'moment';

    export default {
        name: 'schedule-section',

        computed: {
            ...mapGetters(['schedule']),
        },

        methods: {
            getFormattedTime(time) {
                return moment(time).format('h:mm a');
            },

            classNow(clas) {
                const now = new Date();
                return now >= clas.start_time && now <= clas.end_time;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .schedule {
        .h3 {
            margin-bottom: 8px;
        }

        .schedule-item {
            display: flex;
            align-items: center;
            padding: 5px 10px;
            border-radius: 10px;
            border-width: 2px;
            border-style: solid;
            margin: 8px 0;

            .time {
                padding-right: 15px;
                text-align: center;
            }

            .name {
                padding-left: 15px;
                font-size: 20px;
                font-weight: bold;
                text-transform: capitalize;
            }

            &.now {
                border-width: 5px;
            }
        }
    }
</style>
