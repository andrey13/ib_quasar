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
                    <q-input :dense=true outlined label="имя" v-model="user" autofocus @keyup.enter="prompt = false" />
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
                    <q-btn size="12px" class="text-uppercase" :loading="progress.loading" :percentage="progress.percentage"
                        color="primary" @click="startLoging" style="width: 120px">
                        ВВОД
                        <template v-slot:loading>
                            <q-spinner-hourglass class="on-left" />
                            проверка...
                        </template>
                    </q-btn>
                </q-card-actions>

                <br>

            </q-card>
        </q-dialog>
    </div>
</template>


<!-- ------------------------------------------------------------------------------ -->
<script setup>
import { defineProps, computed } from 'vue'
import { ref, onBeforeUnmount, onDeactivated } from 'vue'
import { login_user, login_user1 } from 'src/util/esk'
import { useZakazStore } from 'src/stores/ZakazStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
    active: {
        type: Boolean,
        default: false
    }
})

const user = ref('')
const password = ref('')
const isPwd = ref(true)

const progress = ref({
    loading: false,
    percentage: 0
})
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

let interval = null

const startLoging = async () => {
    progress.value.loading = true
    progress.value.percentage = 0

    store.$patch((state) => {
        state.g_user.logon = false
    })
    console.log('store.g_user.logon = ', store.g_user.logon)

    interval = setInterval(() => {
        progress.value.percentage += Math.floor(Math.random() * 8 + 10)
        if (progress.value.percentage >= 100) progress.value.percentage = 0
    }, 700)

    const result = await login_user(user.value, password.value)

    console.log('result = ', result)

    if (result == 'YES') {
        emit('closeModal')
        console.log('patch')
        store.$patch((state) => {
            state.g_user.logon = true
            state.alert_active = false
        })
        console.log('store.g_user.logon = ', store.g_user.logon)
        console.log('store.alert_active = ', store.alert_active)
    } else {
        store.alert_on()
    }

    progress.value.loading = false
    progress.value.percentage = 0
    clearInterval(interval)

}

const dialogVisible = computed(() => {
    return props.active
})

const emit = defineEmits(['closeModal'])

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
