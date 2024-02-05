<template>
    <div ref="tab1"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import { useZakazStore } from 'stores/ZakazStore'

defineOptions({
    name: 'TableZakaz'
})

const store = useZakazStore()
const tab1 = ref(null)
const tabulator = ref(null)

onMounted(() => {
    console.log('store: ', store.id_zakaz)
    tabulator.value = new Tabulator(tab1.value, {
        ajaxURL: "http://localhost:3000/zakazes",
        ajaxConfig: "GET",
        ajaxContentType: "json",
        // data: tableData.value,
        // reactiveData: true,
        layout: "fitColumns",
        height: "100%",
        selectable: 1,
        columns: [
            { title: "Заказчик", field: "fio" },
            { title: "Администратор", field: "admin" },
            { title: "Обслуживание", field: "obsluz" },
            { title: "Аванс", field: "avans" },
            { title: "Оформление", field: "music" },
            { title: "Аренда", field: "arenda" },
            { title: "Сумма заказа", field: "summa" },
            { title: "Сумма/чел", field: "summa1" },
        ],
    })

    tabulator.value.on("rowClick", function (e, row) {
        const id = row.getData().id
        store.set_id_zakaz(id)
    })
})
</script>

<style lang="scss" scoped></style>
