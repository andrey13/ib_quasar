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
                <q-item clickable v-show="loginVisible">
                    <q-item-section>
                        <q-item-label>AAA</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
            <q-btn
                flat
                dense
                round
                icon="menu"
                aria-label="Menu"
                @click="loginVisibleOn"
            />
            <q-btn
                flat
                dense
                round
                icon="menu"
                aria-label="Menu"
                @click="loginVisibleOff"
            />
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
{
    /*  */
}
import { ref } from "vue";
import LeftMenuItem from "components/LeftMenuItem.vue";
import LoginPwd1 from "src/components/LoginPwd1.vue";
import LoginPwd from "src/components/LoginPwd.vue";
import { onMounted } from "vue";
import { getCurrentInstance } from "vue";
import route from "src/router";
import { useRouter, useRoute } from "vue-router";

// import { beforeRouteEnter } from "vue";

const router = useRouter();

onMounted(() => {
    console.log("onMointed ----------------------------------------1");
    // const router = route();
    router.push({ name: "login" });

    // router
    //     .isReady()
    //     .then(() => {
    //         router.push("login");
    //         onsole.log("onMointed ----------------------------------------2");
    //     })
    //     .catch((error) => {
    //         console.error("Failed to navigate to login due to error:", error);
    //     });
});

// beforeRouteEnter((to, from, next) => {
//     // Переход на другой маршрут
//     next((vm) => {
//         vm.$router.push("/login"); // замените '/your-route' на путь к вашему маршруту
//     });
// });

defineOptions({
    name: "MainLayout",
});

const leftDrawerOpen = ref(false);
const loginVisible = ref(true);

const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleLoginVisible = () => {
    loginVisible.value = !loginVisible.value;
    console.log("loginVisible.value = ", loginVisible.value);
};

const loginVisibleOn = () => {
    loginVisible.value = true;
    console.log("loginVisible.value = ", loginVisible.value);
};

const loginVisibleOff = () => {
    loginVisible.value = false;
    console.log("loginVisible.value = ", loginVisible.value);
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
    {
        title: "Выход",
        // caption: "Community Quasar projects",
        icon: "info",
        link: "login",
    },
];
</script>
