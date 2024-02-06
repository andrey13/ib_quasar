<template>
    <div id="App">
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
// console.log("APP.VUE ----------------------------------------");

defineOptions({
    name: "App",
});

onMounted(() => {
    console.log("onMointed ----------------------------------------");
});
</script>
