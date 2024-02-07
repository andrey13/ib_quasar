import MainLayout from "layouts/MainLayout.vue"
import ZakazPage from "pages/ZakazPage.vue"
import VocabPage from "pages/VocabPage.vue"
import ConfigPage from "pages/ConfigPage.vue"
import UsersPage from "pages/UsersPage.vue"
import ProfilePage from "pages/ProfilePage.vue"
import HelpPage from "pages/HelpPage.vue"
import AboutPage from "pages/AboutPage.vue"
import LoginPwd from "components/LoginPwd1.vue"
import ErrorNotFound from "pages/ErrorNotFound.vue"

const routes = [
    {
        path: "/",
        name: "home",
        component: MainLayout,
        children: [
            {
                name: "zakaz",
                path: "zakaz",
                component: ZakazPage,
            },
            {
                name: "vocab",
                path: "vocab",
                component: VocabPage,
            },
            {
                name: "config",
                path: "config",
                component: ConfigPage,
            },
            {
                name: "users",
                path: "users",
                component: UsersPage,
            },
            {
                name: "profile",
                path: "profile",
                component: ProfilePage,
            },
            {
                name: "help",
                path: "help",
                component: HelpPage,
            },
            {
                name: "about",
                path: "about",
                component: AboutPage,
            },
            {
                name: "login",
                path: "login",
                component: LoginPwd,
            },
        ],
    },

    {
        path: "/:catchAll(.*)*",
        component: ErrorNotFound,
    },
];

export default routes;
