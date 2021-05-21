<template>
    <base-modal ref="addAnnouncement" heading="Add Announcement">
        <template v-slot:body>
            <base-input
                type="textarea"
                name="announcement"
                placeholder="Announcement"
                v-model="announcement.label"
            />
        </template>
        <template v-slot:footer>
            <base-button
                type="button"
                button-type="submit"
                color="dark-orange"
                @click="addAnnouncement"
            >
                Add
            </base-button>
        </template>
    </base-modal>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'announcement-input-modal',

        data() {
            return {
                announcement: {
                    timestamp: new Date(),
                    label: '',
                },
            };
        },

        computed: {
            ...mapGetters(['currentClass']),
        },

        methods: {
            ...mapActions(['updateClassDoc']),

            addAnnouncement() {
                const clas = this.currentClass;
                clas.announcements.push(this.announcement);
                this.updateClassDoc(clas);
                this.$refs.addAnnouncement.closeModal();
            },

            openModal() {
                this.$refs.addAnnouncement.openModal();
            },
        },
    };
</script>

<style lang="scss" scoped></style>
