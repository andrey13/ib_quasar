<template>
    <q-dialog v-model="store.alert_active" persistent>
        <q-card>

            <q-card-section :class="`${props.bcolor} ${props.fcolor}`" align="center">
                <div class="text-h6"><b>{{ props.title }}</b></div>
            </q-card-section>

            <br>

            <q-card-section class="q-pt-none">{{ props.text }}</q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="OK" color="fcolor" @click="emit('closeAlert')" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>


<script setup>

import { defineProps, computed } from 'vue'
import { ref, onUnmounted } from 'vue'
import { useZakazStore } from 'src/stores/ZakazStore'
import { storeToRefs } from 'pinia'

const store = useZakazStore()

const {
    g_user,
    user_logon,
    alert_active,
    user_on,
    user_off,
    alert_on,
    alert_off
} = storeToRefs(store)

const props = defineProps({
    active: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: 'TITLE'
    },
    text: {
        type: String,
        default: 'text'
    },
    bcolor: {
        type: String,
        default: 'bg-primary'
    },
    fcolor: {
        type: String,
        default: 'text-white'
    },
})

const emit = defineEmits(['closeAlert'])

// onUnmounted(() => {
//     console.log('onUnmounted')
// })

// let dialogVisible = ref(props.active)
// let dialogVisible = ref(true)

// const dialogVisible = computed(() => {
//     return props.active
// })

// const alert_style = computed(() => {
//     const style = `color: ${props.fcolor}; background-color: ${props.bcolor};`
//     return style
// })

</script>
