<template>
    <section class="classes">
        <base-card
            v-for="(clas, index) in classes"
            :key="index"
            class="class-link"
            :to="{ path: `/student-class/${clas.id}` }"
            :background="`${clas.color}44`"
            :border="clas.color"
        >
            <div class="teacher-img" />
            <base-text type="h4">{{ clas.name }}</base-text>
        </base-card>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'classes-section',

        computed: {
            ...mapGetters(['classes']),
        },
    };
</script>

<style lang="scss" scoped>
    .classes {
        overflow: scroll;
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: repeat(5, 1fr);
        grid-auto-flow: column;
        text-align: center;
        text-transform: capitalize;

        .class-link {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            padding: 10px;

            .teacher-img {
                height: 90px;
                width: 90px;
                border-radius: 50%;
                background-image: url('../../assets/images/placeholder-avatar.png');
                background-size: cover;
                background-position: center;
                margin-bottom: 7px;
            }
        }
    }
</style>
