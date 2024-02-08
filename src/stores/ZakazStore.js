import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useZakazStore = defineStore('zakaz', () => {

    const id_zakaz = ref(0)
    const id_group = ref(0)
    const id_zaklst = ref(0)
    const id_bludo = ref(0)
    const g_user = ref({ logon: false })
    const user_logon = ref(false)
    const alert_active = ref(false)
    const logon_active = ref(false)

    const set_id_zakaz = (id) => { id_zakaz.value = id }
    const set_id_group = (id) => { id_group.value = id }
    const user_on = () => { user_logon.value = true }
    const user_off = () => { user_logon.value = false }
    const alert_on = () => { alert_active.value = true }
    const alert_off = () => { alert_active.value = false }

    return {
        id_zakaz,
        id_group,
        id_zaklst,
        id_bludo,
        set_id_zakaz,
        set_id_group,
        g_user,
        user_logon,
        alert_active,
        user_on,
        user_off,
        alert_on,
        alert_off
    }
})
