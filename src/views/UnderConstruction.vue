<template>
    <div class="under-construction">
        <img src="@/assets/images/construction.png" alt="excavator" />
        <base-text type="h2">CurioSchool is under construction.</base-text>
        <base-text type="p">Check back at the end of May.</base-text>
    </div>
</template>

<script>
    export default {
        name: 'under-construction',
    };
</script>

<style lang="scss" scoped>
    .under-construction {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100vw;
        height: 100vh;

        img {
            width: 500px;
            max-width: 80%;
            margin: 0 30px 50px;
        }

        .h2 {
            margin: 0 30px 15px;
        }
    }
</style>
