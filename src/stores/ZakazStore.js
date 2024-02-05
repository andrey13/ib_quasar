import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useZakazStore = defineStore('zakaz', () => {

    const id_zakaz = ref(0)
    const id_group = ref(0)
    const id_zaklst = ref(0)
    const id_bludo = ref(0)

    const set_id_zakaz = (id) => { id_zakaz.value = id }
    const set_id_group = (id) => { id_group.value = id }

    return {
        id_zakaz,
        id_group,
        id_zaklst,
        id_bludo,
        set_id_zakaz,
        set_id_group,
    }
})
