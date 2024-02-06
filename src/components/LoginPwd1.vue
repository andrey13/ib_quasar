<template>
    <div>
        <q-dialog>
            <q-card>
                <q-card-section> Содержимое модального окна </q-card-section>
                <q-card-actions align="right">
                    <q-btn
                        label="Закрыть"
                        color="primary"
                        @click="closeModal"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: true,
        };
    },
    methods: {
        showModal() {
            this.dialogVisible = true;
        },
        closeModal() {
            this.dialogVisible = false;
        },
    },
};
</script>
