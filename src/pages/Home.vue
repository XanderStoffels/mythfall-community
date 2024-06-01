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
            There {{ mythfallStatus?.NumPlayers == 1 ? "is" : "are" }} {{ mythfallStatus?.NumPlayers }} players online right
            now.
        </p>

        <hr />

        <div class="flex flex-wrap justify-start">
            <div class="flex justify-center w-full gap-10 p-4 my-4">
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

            <div class="flex flex-col gap-2">
                <div v-if="latestPatchNotes?.features.length ?? 0 > 0">
                    <h3 class="my-4 text-3xl font-light">New features in {{ Version[selectedVersionB!] }}</h3>
                    <ul class="flex flex-col gap-3">
                        <li v-for="feature in latestPatchNotes?.features">{{ feature }}</li>
                    </ul>
                </div>
                <div v-if="latestPatchNotes?.fixes.length ?? 0 > 0">
                    <h3 class="my-4 text-3xl font-light">Fixes in {{ Version[selectedVersionB!] }}</h3>
                    <ul class="flex flex-col gap-3">
                        <li v-for="fix in latestPatchNotes?.fixes">{{ fix }}</li>
                    </ul>
                </div>
            </div>

            <div v-if="areThereChanges()" class="w-full">

                <div v-if="newItems?.length" class="flex flex-col gap-2">
                    <h1 class="my-4 text-3xl font-light">New items</h1>
                    <div v-for="item in newItems" :key="item.ID">
                        <NewCard :item="item" />
                    </div>
                </div>

                <div v-if="removedItems?.length" class="flex flex-col gap-2">
                    <h1 class="my-4 text-3xl font-light">Removed items</h1>
                    <div v-for="item in removedItems" :key="item.ID">
                        <RemovedCard :item="item" />
                    </div>
                </div>


                <div v-if="changedItems?.length" class="flex flex-col gap-2">
                    <h1 class="my-4 text-3xl font-light">Item changes</h1>
                    <div v-for="item in changedItems" :key="item.ID">
                        <ChangeCard :item="item" />
                    </div>
                </div>
            </div>
            <div v-else class="flex flex-col w-full gap-1 px-4 mt-8 text-red-700 md:p-0 md:w-4/5 xl:w-1/2 md:order-2">
                <h1 class="text-3xl font-light">No changes</h1>
                <h2 class="text-lg font-light">Make sure you have selected two different versions.</h2>
            </div>

            <div class="flex-1"></div>
        </div>
    </div>

    <div class="h-12">

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue'
import { ItemChanges, useChanges } from '../composables/changes'
import { Item } from '../types';
import { UpdateNotes, useVersions, Version } from '../composables/versions';
import { MythfallStatus, useMythfallStatus } from '../composables/mythfall-status';
import NewCard from '../components/NewCard.vue';
import ChangeCard from '../components/ChangeCard.vue';
import RemovedCard from '../components/RemovedCard.vue';


const changedItems: Ref<ItemChanges[] | undefined> = ref([]);
const newItems: Ref<Item[] | undefined> = ref([]);
const removedItems: Ref<Item[] | undefined> = ref([]);
const latestPatchNotes = ref<UpdateNotes | undefined>();
const mythfallStatus = ref<MythfallStatus | undefined>();

const { changes } = useChanges();
const { selectedVersionA, selectedVersionB, versionAOptions, versionBOptions } = useVersions();
const { getStatus } = useMythfallStatus();

onMounted(async () => {
    const status = await getStatus();
    mythfallStatus.value = status;
});

watch(changes, () => {
    changedItems.value = changes.value?.[0].changedItems ?? [];
    newItems.value = changes.value?.[0].newItems ?? [];
    removedItems.value = changes.value?.[0].removedItems ?? [];
    latestPatchNotes.value = changes.value?.[1];
});

function areThereChanges(): boolean {
    if (!changedItems.value || !newItems.value || !removedItems.value) return false;
    return changedItems.value.length > 0 || newItems.value.length > 0 || removedItems.value.length > 0;
}


</script>

<style scoped></style>