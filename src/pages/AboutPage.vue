<template>
    <div>
        <q-card class="my-card">
            <q-card-section>
                {{ lorem }}
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
import { useZakazStore } from "src/stores/ZakazStore"

const store = useZakazStore()
const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

// store.alert_on()

defineOptions({
    name: "AboutPage",
})
</script>

<style lang="scss" scoped></style>
