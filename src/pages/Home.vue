<template>
    <div class="flex justify-center">
        <div class="xl:flex-1">

        </div>
        <div v-if="areThereChanges()" class="flex flex-col w-full gap-4 p-4 md:w-4/5 xl:w-1/2">
            <div v-if="newItems?.length" class="flex flex-col gap-2">
                <h1 class="my-4 text-5xl font-light">New items</h1>
                <div v-for="item in newItems" :key="item.ID">
                    <NewCard :item="item" />
                </div>
            </div>

            <div v-if="removedItems?.length" class="flex flex-col gap-2">
                <h1 class="my-4 text-5xl font-light">Removed items</h1>
                <div v-for="item in removedItems" :key="item.ID">
                    <h3> {{ item.Name }}</h3>
                </div>
            </div>


            <div v-if="changedItems?.length" class="flex flex-col gap-2">
                <h1 class="my-4 text-5xl font-light">Item changes</h1>
                <div v-for="item in changedItems" :key="item.ID">
                    <ChangeCard :item="item" />
                </div>
            </div>
        </div>
        <div v-else class="flex flex-col w-full gap-4 p-4 md:w-4/5 xl:w-1/2">
            <h1 class="text-5xl font-light">No changes</h1>
            <h2 class="text-2xl font-light">Make sure you have selected two different versions.</h2>
        </div>
        <div class="flex flex-col gap-10 p-4 mt-4 xl:flex-1">
            <div>
                <label for="version-a" class="block mb-2 text-sm font-medium text-gray-900">
                    Compare version
                </label>
                <select id="version-a" v-model="selectedVersionA">
                    <option v-for="version in versionAOptions" :key="version" :value="version">{{ Version[version] }}
                    </option>
                </select>
            </div>
            <div>
                <label for="version-a" class="block mb-2 text-sm font-medium text-gray-900">
                    against version
                </label>
                <select v-model="selectedVersionB">
                    <option v-for="version in versionBOptions" :key="version" :value="version">{{ Version[version] }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue'
import { ItemChanges, useChanges } from '../composables/changes'
import ChangeCard from '../components/ChangeCard.vue';
import { Item } from '../types';
import NewCard from '../components/NewCard.vue';
import { useVersions, Version } from '../composables/versions';


const changedItems: Ref<ItemChanges[] | undefined> = ref([]);
const newItems: Ref<Item[] | undefined> = ref([]);
const removedItems: Ref<Item[] | undefined> = ref([]);

const { changes } = useChanges();
const { selectedVersionA, selectedVersionB, versionAOptions, versionBOptions } = useVersions();

watch(changes, () => {
    changedItems.value = changes.value?.changedItems ?? [];
    newItems.value = changes.value?.newItems ?? [];
    removedItems.value = changes.value?.removedItems ?? [];
});

function areThereChanges(): boolean {
    if (!changedItems.value || !newItems.value || !removedItems.value) return false;
    return changedItems.value.length > 0 || newItems.value.length > 0 || removedItems.value.length > 0;
}


</script>

<style scoped></style>