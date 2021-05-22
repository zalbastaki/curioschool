<template>
    <base-dashboard color="dark-orange">
        <base-loader :show="false" />
        <div v-if="true" class="teacher-attendance">
            <section class="top-bar">
                <base-text type="h1">Attendance</base-text>
            </section>
            <!-- TO DO -->
            <base-text type="p">Coming soon!</base-text>
        </div>
    </base-dashboard>
</template>

<script>
    export default {
        name: 'teacher-attendance',
    };
</script>

<style lang="scss" scoped>
    .teacher-attendance {
        .top-bar {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;

            .h1 {
                font-size: 50px;
            }
        }
    }
</style>
