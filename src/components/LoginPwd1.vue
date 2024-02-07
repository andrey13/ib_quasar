<!-- ------------------------------------------------------------------------------ -->
<template>
    <div>
        <q-dialog v-model="dialogVisible" persistent>
            <q-card class="my-card">


                <q-card-section class="bg-primary text-white">
                    <div class="text-h6">авторизация</div>
                    <div class="text-subtitle2">в домене REGIONS</div>
                </q-card-section>

                <br>

                <q-card-section class="q-pt-none text-uppercase">
                    <q-input :dense=true outlined label="имя" v-model="address" autofocus @keyup.enter="prompt = false" />
                </q-card-section>


                <q-card-section class="q-pt-none">
                    <q-input :dense=true outlined class="input-box" label="пароль" v-model="password"
                        :type="isPwd ? 'password' : 'text'">
                        <template v-slot:append>
                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwd = !isPwd" />
                        </template>
                    </q-input>
                </q-card-section>

                <!-- <br> -->

                <!-- <q-separator /> -->
                <q-card-actions align="around">
                    <q-btn size="12px" style="width: 120px" label="отмена" color="red-8" />
                    <q-btn size="12px" class="text-uppercase" :loading="progress.loading" color="primary"
                        @click="startComputing" style="width: 120px">
                        ВВОД
                        <template v-slot:loading>
                            <q-spinner-gears class="on-left" />
                            проверка...
                        </template>
                    </q-btn>
                </q-card-actions>
                <br>

                <br>

            </q-card>
        </q-dialog>
    </div>
</template>


<!-- ------------------------------------------------------------------------------ -->
<script setup>
import { defineProps, computed } from 'vue'
import { ref, onBeforeUnmount, onDeactivated } from 'vue'

const props = defineProps({
    dialogActive: {
        type: Boolean,
        default: false
    }
})

const progress = ref({ loading: false, percentage: 0 })
let interval = null

const startComputing = () => {
    progress.value.loading = true
    progress.value.percentage = 0

    // interval = setInterval(() => {
    //     progress.value.percentage += Math.floor(Math.random() * 8 + 10)
    //     if (progress.value.percentage >= 100) {
    //         clearInterval(interval)
    //         progress.value.loading = false
    //         progress.value.percentage = 0
    //     }
    // }, 700)

    setTimeout(() => {
        progress.value.loading = false
        progress.value.percentage = 0
        clearInterval(interval)
        console.log('Component deactivated!')
        emit('closeModal')
    }, 2000);

}

// onDeactivated(() => {
//     clearInterval(interval)
//     console.log('Component deactivated!')
// })

const dialogVisible = computed(() => {
    return props.dialogActive
})

const password = ref('')
const isPwd = ref(true)
const emit = defineEmits(['closeModal'])

const closeModal = () => { emit('closeModal') }

</script>


<!-- ------------------------------------------------------------------------------ -->
<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 300px
.input-box
    .q-field__control
        height: 10px
        font-size: 16px
.text-uppercase
    text-transform: none


</style>
