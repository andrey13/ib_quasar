import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * Если вы не строите режим SSR, вы можете
 * напрямую экспортировать экземпляр маршрутизатора;
 *
 * Функция ниже также может быть асинхронной; либо используйте
 * async/await или вернуть обещание, которое разрешает
 * с экземпляром Router.
 */

export default route(function (/* { store, ssrContext } */) {
    const createHistory = process.env.SERVER
        ? createMemoryHistory
        : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,

        // Оставьте все как есть и вместо этого внесите изменения в quasar.conf.js!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath

        history: createHistory(process.env.VUE_ROUTER_BASE)
    })

    return Router
})
