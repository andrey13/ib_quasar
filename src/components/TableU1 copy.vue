<template>
    <div ref="tab1"></div>
</template>

<script>
import { TabulatorFull as Tabulator } from 'tabulator-tables';

export default {
    data() {
        return {
            tabulator: null,
            tableData: [
                { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
                { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
                { id: 3, name: "Christine Lobowski", age: "42", col: "green", dob: "22/05/1982" },
                { id: 4, name: "Brendon Philips", age: "125", col: "orange", dob: "01/08/1980" },
                { id: 5, name: "Margret Marmajuke", age: "16", col: "yellow", dob: "31/01/1999" },
            ],
        }
    },
    mounted() {
        let wh = window.innerHeight
        this.tabulator = new Tabulator(this.$refs.tab1, {
            ajaxURL: "http://localhost:3000/comp",
            // ajaxParams: { t: "news", o: "dt DESC" },
            ajaxConfig: "GET",
            ajaxContentType: "json",
            // data: this.tableData,
            // reactiveData: true,
            layout: "fitColumns",
            //height: wh/3,
            height: "100%",
            columns: [
                { title: "ID", field: "id" },
                { title: "PC", field: "name" },
                { title: "СОНО", field: "sono" },
            ],
        });
    }
}
</script>

<style lang="scss" scoped></style>

