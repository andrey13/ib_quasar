//-----------------------------------------------------------------------------

<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="toggleLeftDrawer"
                />

                <q-toolbar-title> ZakaZ </q-toolbar-title>

                <div>zakaz v2.0.0</div>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
            <q-list>
                <LeftMenuItem v-for="link in linksList" :key="link.link" v-bind="link" />
            </q-list>

            <!-- кнопа ВЫХОД-------------------------------------- -->
            <q-item clickable @click="store.logon_on">
                <q-item-section avatar>
                    <q-icon name="logout" />
                </q-item-section>

                <q-item-section>
                    <q-item-label>Выход</q-item-label>
                </q-item-section>
            </q-item>
        </q-drawer>

        <q-page-container
            style="
                height: 100vh;
                width: 100vw;
                background-color: burlywood;
                display: flex;
                flex-wrap: wrap;
            "
        >
            <LoginPwd @closeLogon="store.logon_off"> </LoginPwd>
            <AlertWindow
                :title="'ВНИМАНИЕ!'"
                :text="'неправильное имя или пароль!'"
                :bcolor="'bg-negative'"
                :fcolor="'text-yellow'"
                @closeAlert="store.alert_off"
            >
            </AlertWindow>
            <router-view :key="$route.fullPath"></router-view>
        </q-page-container>
    </q-layout>
</template>

//-----------------------------------------------------------------------------

<script setup>
import { ref } from "vue"
import LeftMenuItem from "components/LeftMenuItem.vue"
// import { onMounted } from "vue"
// import { useRouter, useRoute } from "vue-router"
import LoginPwd from "src/components/LoginPwd.vue"
import AlertWindow from "src/components/AlertWindow.vue"
import { useZakazStore } from "src/stores/ZakazStore"

const store = useZakazStore()

// onMounted(() => {
//     const router = useRouter()
//     // router.push({ name: "login" })
// })

defineOptions({
    name: "MainLayout",
})

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

const linksList = [
    {
        title: "Работа с заказами",
        // caption: "quasar.dev",
        icon: "format_list_bulleted",
        link: "zakaz",
    },
    {
        title: "Ведение справочников",
        // caption: "github.com/quasarframework",
        icon: "edit_note",
        link: "vocab",
    },
    {
        title: "Настройка программы",
        // caption: "chat.quasar.dev",
        icon: "settings",
        link: "config",
    },
    {
        title: "Пользователи",
        // caption: "forum.quasar.dev",
        icon: "people",
        link: "users",
    },
    {
        title: "Профиль",
        // caption: "@quasarframework",
        icon: "fingerprint",
        link: "profile",
    },
    {
        title: "Помошь",
        // caption: "@QuasarFramework",
        icon: "help_outline",
        link: "help",
    },
    {
        title: "О программе",
        // caption: "Community Quasar projects",
        icon: "info",
        link: "about",
    },
    // {
    //     title: "Выход",
    //     // caption: "Community Quasar projects",
    //     icon: "info",
    //     link: "login",
    // },
]
</script>
