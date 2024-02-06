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
                <LeftMenuItem
                    v-for="link in linksList"
                    :key="link.link"
                    v-bind="link"
                />
                <q-item clickable>
                    <q-item-section>
                        <q-item-label>AAA</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
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
            <router-view :key="$route.fullPath"></router-view>
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from "vue";
import LeftMenuItem from "components/LeftMenuItem.vue";
// import LoginPwd from "src/components/LoginPwd.vue";

defineOptions({
    name: "MainLayout",
});

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
};

const linksList = [
    {
        title: "Работа с заказами",
        // caption: "quasar.dev",
        icon: "shopping_cart",
        link: "zakaz",
    },
    {
        title: "Ведение справочников",
        // caption: "github.com/quasarframework",
        icon: "library_books",
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
    //     link: "logoff",
    // },
];
</script>
