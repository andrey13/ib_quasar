//-----------------------------------------------------------------------------

<template>
    <div>
        <q-dialog v-model="store.logon_active" persistent>
            <q-card class="my-card">
                <q-card-section class="bg-primary text-white">
                    <div class="text-h6">авторизация</div>
                    <div class="text-subtitle2">в домене REGIONS</div>
                </q-card-section>

                <br />

                <q-card-section class="q-pt-none text-uppercase">
                    <q-input
                        :dense="true"
                        outlined
                        label="имя"
                        v-model="user"
                        autofocus
                        @keyup.enter="prompt = false"
                    />
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input
                        :dense="true"
                        outlined
                        class="input-box"
                        label="пароль"
                        v-model="password"
                        :type="isPwd ? 'password' : 'text'"
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                            />
                        </template>
                    </q-input>
                </q-card-section>

                <q-card-actions align="around">
                    <q-btn
                        size="12px"
                        style="width: 120px"
                        label="отмена"
                        color="red-8"
                    />
                    <q-btn
                        size="12px"
                        class="text-uppercase"
                        :loading="progress.loading"
                        :percentage="progress.percentage"
                        color="primary"
                        @click="startLoging"
                        style="width: 120px"
                    >
                        ВВОД
                        <template v-slot:loading>
                            <q-spinner-hourglass class="on-left" />
                            проверка...
                        </template>
                    </q-btn>
                </q-card-actions>

                <br />
            </q-card>
        </q-dialog>
    </div>
</template>

//-----------------------------------------------------------------------------

<script setup>
import { ref } from "vue"
import { login_user } from "src/util/esk"
import { useZakazStore } from "src/stores/ZakazStore"

const store = useZakazStore()
const user = ref("")
const password = ref("")
const isPwd = ref(true)
const emit = defineEmits(["closeLogon"])

const progress = ref({
    loading: false,
    percentage: 0,
})

let interval = null

const startLoging = async () => {
    progress.value.loading = true
    progress.value.percentage = 0

    interval = setInterval(() => {
        progress.value.percentage += Math.floor(Math.random() * 8 + 10)
        if (progress.value.percentage >= 100) progress.value.percentage = 0
    }, 700)

    const result = await login_user(user.value, password.value)

    if (result == "YES") {
        emit("closeLogon")
        console.log("patch")
        store.alert_off()
        store.logon_off()
    } else {
        store.alert_on()
    }

    progress.value.loading = false
    progress.value.percentage = 0
    clearInterval(interval)
}
</script>

//-----------------------------------------------------------------------------

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
