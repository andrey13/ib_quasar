<template>
    <div id="tab1" class="box">
        <!-- <TableZakaz @updateid="(id) => { id_zakaz = id }" :id="id_zakaz" /> -->
        <TableZakaz />
    </div>
    <div id="tab1" class="box">
        <TableGroup />
    </div>
    <div id="tab1" class="box">
        <!-- <TableZakLst :id="id_zakaz" /> -->
        <TableZakLst />
    </div>
    <div id="tab1" class="box q-ma-xl bg-lime-8">
        <TableBludo />
        <!-- <TableU4 /> -->
    </div>
</template>

<script setup>
import TableZakaz from 'components/TableZakaz.vue'
import TableGroup from 'components/TableGroup.vue'
import TableZakLst from 'components/TableZakLst.vue'
import TableBludo from 'components/TableBludo.vue'

defineOptions({
    name: 'ZakazPage'
})

</script>

<style lang="scss" scoped>
.box {
    height: 50%;
    width: 50%;
    margin: 0;
    padding: 0;
    border: 1px solid black;
    // display: flex;
}
</style>
