<template>
    <router-view />
</template>

<script setup>
import { onMounted } from "vue";
console.log("APP.VUE ----------------------------------------");

defineOptions({
    name: "App",
});

onMounted(() => {
    console.log("onMointed ----------------------------------------");
});
</script>
