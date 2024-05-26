<template>
    <div class="flex flex-col w-full gap-1 p-4 border-2 rounded shadow border-zinc-500 bg-zinc-100">
        <div class="flex items-center gap-4 h-fit">
            <img class="w-14" style="image-rendering: pixelated;" :src="base64Image(item.Icon)" alt="item.Name" />
            <div>
                <h1 class="text-xl">{{ item.Name }}</h1>
                <div class="leading-3">
                    <span class="text-sm italic">{{ item.Description }}.</span>
                    <span class="block text-sm italic">{{ getSlotAndSourceDescription(item) }}</span>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-3 pl-2 mt-1 ml-16 md:gap-2">
            <div v-for="property in relevantProperties(item)" :key="property" class="flex flex-col text-sm ">
                <span v-if="property == 'Modifiers'">
                    <div v-for="mod in item[property]" class="font-semibold">
                        <span v-if="mod.Filter">If <span class="text-red-600">{{ mod.Filter.toLowerCase().slice(0, -1)
                        }}</span>,
                            &nbsp</span>
                        <span v-else>Applies </span>
                        <span>{{ mod.Modifiers.join(' ,') }}.</span>
                    </div>
                </span>
                <p v-else>
                <h3 class="font-semibold">{{ property }}</h3>
                {{ item[property] }}
                </p>
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
    // Make a dictionary of priorities. Each property not in the dictionary will be at the bottom of the list, sorted alphabetically.
    // The higher the number, the higher the priority, which means it will be displayed first.
    const priorities: Record<string, number> = {
        Slot: 1,
        Source: 2,
    };
    return Object.keys(item)
        .filter(p => !['Icon', 'ID', 'Deprecated', 'Name', 'Description', 'Source', 'EquipType'].includes(p))
        .filter(p => item[p] !== null && item[p] !== undefined)
        .sort((a, b) => {
            if (priorities[a] && priorities[b]) {
                return priorities[a] - priorities[b];
            } else if (priorities[a]) {
                return -1;
            } else if (priorities[b]) {
                return 1;
            } else {
                return a.localeCompare(b);
            }
        });
}

function getSlotAndSourceDescription(item: Item): string {
    if (item.Source === 'Craftable') {
        return `Can be crafted by the player.`
    }

    return `Found in ${item.Source}.`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


</script>

<style scoped></style>