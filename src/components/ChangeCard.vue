<template>
    <div class="w-full p-4 border-4 rounded">
        <div class="flex items-center gap-4 h-fit">
            <img class="w-14" style="image-rendering: pixelated;" :src="base64Image(item.Icon)" alt="item.Name" />
            <h1 class="text-2xl">{{ item.Name }}</h1>
        </div>
        <div class="flex flex-col gap-3 ml-16 md:gap-2">
            <div v-for="change in item.changes" class="pl-2">
                <span class="inline font-bold">• </span>
                <div v-if="change.prop == 'Icon'" class="inline-flex items-center gap-2">
                    <span>The <span class="font-semibold">icon</span> changed from</span>
                    <img class="w-7" style="image-rendering: pixelated;" :src="base64Image(change.old)" alt="item.Name" />
                    <span>to</span>
                    <img class="w-7" style="image-rendering: pixelated;" :src="base64Image(change.new)" alt="item.Name" />
                </div>
                <div v-else class="inline">
                    <span>
                        <span class="font-semibold">{{ change.prop }}</span>
                        changed from
                        <span class="font-semibold">{{ change.old }}</span>
                        to
                        <span class="font-semibold">{{ change.new }}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ItemChanges } from '../composables/changes';


const props = defineProps<{
    item: ItemChanges
}>();

function base64Image(image: string): string {
    return `data:image/png;base64,${image}`;
}

</script>

<style scoped></style>