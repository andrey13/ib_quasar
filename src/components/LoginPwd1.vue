<!-- ------------------------------------------------------------------------------ -->
<template>
    <div>
        <q-dialog v-model="dialogVisible" persistent>
            <q-card class="my-card">
                <q-card-section class="bg-primary text-white">
                    <div class="text-h6">авторизация</div>
                    <div class="text-subtitle2">в домене REGIONS</div>
                </q-card-section>
                <q-card-section>
                    <div class="text-h7">имя:</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <q-input square outlined v-model="address" autofocus @keyup.enter="prompt = false" />
                </q-card-section>
                <q-card-section>
                    <div class="text-h7">пароль:</div>
                </q-card-section>


                <q-card-section class="q-pt-none">
                    <q-input v-model="password" square outlined :type="isPwd ? 'password' : 'text'">
                        <template v-slot:append>
                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwd = !isPwd" />
                        </template>
                    </q-input>
                </q-card-section>


                <!-- <q-separator /> -->
                <q-card-actions align="center">
                    <q-btn text-color="black" size="12px" label="отмена" color="white" />
                    <q-btn text-color="black" size="12px" label="ввод" color="white" @click="closeModal" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>


<!-- ------------------------------------------------------------------------------ -->
<script setup>
import { defineProps, computed } from 'vue'
import { ref } from 'vue'

const props = defineProps({
    dialogActive: {
        type: Boolean,
        default: false
    }
})

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
  max-width: 350px
</style>
