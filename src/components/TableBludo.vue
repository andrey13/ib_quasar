<template>
    <div ref="tab4"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import { useZakazStore } from 'stores/ZakazStore'

defineOptions({
    name: 'TableBludo'
})

const store = useZakazStore()
const tab4 = ref(null)
const tabulator = ref(null)
let tableData = []

onMounted(() => {
    tabulator.value = new Tabulator(tab4.value, {
        data: tableData,
        layout: "fitColumns",
        height: "100%",
        selectable: 1,
        columns: [
            { title: "id", field: "id" },
            { title: "id_group", field: "id_group" },
            { title: "Блюдо", field: "name" },
            { title: "Выход", field: "vixod" },
            { title: "Цена", field: "price" },
        ],
    })

    tabulator.value.on("rowClick", function (e, row) {
        g_tableZakaz = row.getData().id
        console.log("rowClick id: ", row.getData().id)
    })

})

store.$subscribe(async () => {
    tableData = await fetchBludos(store.id_group)
    tabulator.value.replaceData(tableData)
},
    { detached: false }
)

async function fetchBludos(id_group) {
    const response = await fetch('http://localhost:3000/bludo?id=' + id_group)
    const data = await response.json()
    return data
}
</script>

<style lang="scss" scoped></style>

