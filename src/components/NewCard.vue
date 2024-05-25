<template>
    <div class="flex flex-col w-full gap-3 p-4 border-4 rounded">
        <div class="flex items-center gap-4 h-fit">
            <img class="w-14" style="image-rendering: pixelated;" :src="base64Image(item.Icon)" alt="item.Name" />
            <div>
                <h1 class="text-2xl">{{ item.Name }}</h1>
                <p class="italic">{{ item.Description }}</p>
            </div>
        </div>
        <div class="flex flex-col gap-3 pl-2 ml-16 md:gap-2">
            <div v-for="property in relevantProperties(item)" :key="property" class="flex flex-col">
                <span v-if="property == 'EquipType'">
                    <h3 class="font-semibold">Slot</h3>
                    <p>{{ item[property] }}</p>
                </span>
                <span v-else>
                    <h3 class="font-semibold">{{ property }}</h3>
                    <span v-if="property == 'Modifiers'">
                        <div v-for="mod in item[property]">
                            <span class="inline font-bold">• </span>
                            <span v-if="mod.Filter">If {{ mod.Filter }} &nbsp</span>
                            <span v-else>Always applies </span>
                            <span>{{ mod.Modifiers.join(' ,') }}</span>
                        </div>
                    </span>
                    <p v-else>{{ item[property] }}</p>
                </span>
            </div>
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

function relevantProperties(item: Item): string[] {
    return Object.keys(item)
        .filter(p => !['Icon', 'ID', 'Deprecated', 'Name', 'Description'].includes(p))
        .filter(p => item[p] !== null && item[p] !== undefined);
}

</script>

<style scoped></style>