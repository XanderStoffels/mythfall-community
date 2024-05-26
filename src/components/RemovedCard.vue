<template>
    <div class="flex flex-col w-full p-4 text-sm border-2 rounded shadow bg-red-50 border-zinc-500">
        <div class="flex items-center gap-4 h-fit">
            <img class="w-14" style="image-rendering: pixelated;" :src="base64Image(item.Icon)" alt="item.Name" />
            <h1 class="text-xl">{{ item.Name }}</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Item } from '../types';


defineProps<{
    item: Item
}>();

function base64Image(image: string): string {
    return `data:image/png;base64,${image}`;
}

</script>

<style scoped></style>