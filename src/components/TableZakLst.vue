<template>
    <div ref="tab3"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import { useZakazStore } from 'stores/ZakazStore'

defineOptions({
    name: 'TableZakLst'
})

const store = useZakazStore()
const tab3 = ref(null)
const tabulator = ref(null)
let tableData = []

onMounted(async () => {
    tableData = await fetchZakLst(store.id_zakaz)

    tabulator.value = new Tabulator(tab3.value, {
        data: tableData,
        layout: "fitColumns",
        height: "100%",
        selectable: 1,
        columns: [
            { title: "id", field: "id" },
            { title: "id_zakaz", field: "id_zakaz" },
            { title: "id_bludo", field: "id_bludo" },
            { title: "Кол", field: "kol" },
            { title: "Цена", field: "price" },
            { title: "Сумма", field: "sum" },
            { title: "Тарелок", field: "tarelka" },
        ],
    })

    tabulator.value.on("rowClick", function (e, row) {
        //g_tableZakaz = row.getData().id
        console.log("click zakLst id: ", store.id_zakaz)
    })
})

store.$subscribe(async () => {
    tableData = await fetchZakLst(store.id_zakaz)
    tabulator.value.replaceData(tableData)
},
    { detached: false }
)

async function fetchZakLst(id_zakaz) {
    const response = await fetch('http://localhost:3000/zaklst?id=' + id_zakaz)
    const data = await response.json()
    return data
}
</script>

<style lang="scss" scoped></style>

