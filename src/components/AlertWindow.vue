//-----------------------------------------------------------------------------

<template>
    <q-dialog v-model="store.alert_active" persistent>
        <q-card>
            <q-card-section :class="`${props.bcolor} ${props.fcolor}`" align="center">
                <div class="text-h6">
                    <b>{{ props.title }}</b>
                </div>
            </q-card-section>

            <br />

            <q-card-section class="q-pt-none">{{ props.text }}</q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="OK" color="fcolor" @click="$emit('closeAlert')" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

//-----------------------------------------------------------------------------

<script setup>
import { defineProps } from "vue"
import { useZakazStore } from "src/stores/ZakazStore"

const store = useZakazStore()

const props = defineProps({
    active: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: "TITLE",
    },
    text: {
        type: String,
        default: "text",
    },
    bcolor: {
        type: String,
        default: "bg-primary",
    },
    fcolor: {
        type: String,
        default: "text-white",
    },
})
</script>
