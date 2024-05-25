<template>
    <div class="mx-auto w-fit">
        <div class="flex flex-col gap-4 p-4">
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
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue'
import { ItemChanges, useChanges } from '../composables/changes'
import ChangeCard from '../components/ChangeCard.vue';
import { Item } from '../types';
import NewCard from '../components/NewCard.vue';

const changedItems: Ref<ItemChanges[] | undefined> = ref([]);
const newItems: Ref<Item[] | undefined> = ref([]);
const removedItems: Ref<Item[] | undefined> = ref([]);

const { mostRecentChanges } = useChanges();

onMounted(async () => {
    const changes = await mostRecentChanges();
    changedItems.value = changes.changedItems;
    newItems.value = changes.newItems;
    removedItems.value = changes.removedItems;
});


</script>

<style scoped></style>