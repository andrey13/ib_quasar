<template>
    <div ref="tab2"></div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import { useZakazStore } from 'stores/ZakazStore'

defineOptions({
    name: 'TableGroup'
})

const store = useZakazStore()
const tab2 = ref(null)
const tabulator = ref(null)

onMounted(() => {
    tabulator.value = new Tabulator(tab2.value, {
        ajaxURL: `http://localhost:3000/groups`,
        ajaxConfig: "GET",
        ajaxContentType: "json",
        // data: tableData.value,
        // reactiveData: true,
        layout: "fitColumns",
        height: "100%",
        selectable: 1,
        columns: [
            { title: "наименование", field: "name" },
            { title: "id", field: "id" },
        ],
    })

    tabulator.value.on("rowClick", function (e, row) {
        const id = row.getData().id
        store.set_id_group(id)
    })
})
</script>

<style lang="scss" scoped></style>
