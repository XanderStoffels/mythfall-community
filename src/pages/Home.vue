<template>
    <div class="flex flex-col w-full gap-4 px-4 mx-auto mt-4 md:p-0 md:w-4/5 xl:w-1/2">
        <h1 class="text-4xl font-light">Mythfall changelog</h1>
        <p class="font-light">
            This is a tool to generate a nice overview of item changes between Mythfall versions. Select two versions from
            the dropdowns
            below to see the differences between them.
        </p>
        <p class="font-light">
            If you've no clue what Mythfall is, you're missing out. It's a free 2D browser "bullet hell" style multiplayer
            game developed by
            <a class="text-blue-800" href="https://github.com/unitoftime/">UnitOfTime</a>.
            He has a
            <a class="text-blue-800"
                href="https://www.youtube.com/watch?v=dsabHK_TspA&list=PL_r0j2F4Hkj-Grm05K5lCOd6yaeeSAaY2">YouTube
                series</a>
            where he develops the game from scratch, which is how most people found out about it.
        </p>
        <p>
            <a class="font-semibold text-red-800" href="https://mythfall.com/">Play Mythfall now! It's free!</a>
            There are {{ mythfallStatus?.NumPlayers }} players online right now.
        </p>

        <hr />
    </div>



    <div class="flex flex-wrap justify-center">

        <div class="flex justify-center w-full gap-10 p-4 mt-4">
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

        <div v-if="areThereChanges()" class="flex flex-col w-full gap-4 px-4 md:p-0 md:w-4/5 xl:w-1/2 md:order-2">
            <div v-if="newItems?.length" class="flex flex-col gap-2">
                <h1 class="my-4 text-3xl font-light">New items</h1>
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

        <div class="flex-1"></div>



    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue'
import { ItemChanges, useChanges } from '../composables/changes'
import { Item } from '../types';
import { useVersions, Version } from '../composables/versions';
import { MythfallStatus, useMythfallStatus } from '../composables/mythfall-status';
import NewCard from '../components/NewCard.vue';
import ChangeCard from '../components/ChangeCard.vue';


const changedItems: Ref<ItemChanges[] | undefined> = ref([]);
const newItems: Ref<Item[] | undefined> = ref([]);
const removedItems: Ref<Item[] | undefined> = ref([]);
const mythfallStatus = ref<MythfallStatus | undefined>();

const { changes } = useChanges();
const { selectedVersionA, selectedVersionB, versionAOptions, versionBOptions } = useVersions();
const { getStatus } = useMythfallStatus();

onMounted(async () => {
    const status = await getStatus();
    mythfallStatus.value = status;
});

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