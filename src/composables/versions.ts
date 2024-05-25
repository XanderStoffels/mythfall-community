import { Ref, onMounted, ref, watch } from "vue";
import { Item } from "../types";

export enum Version {
  v0_0_9 = 0,
  v0_0_10 = 1,
  v0_0_11 = 2,
}

const selectedVersionA: Ref<Version | null> = ref(Version.v0_0_10);
const selectedVersionB: Ref<Version | null> = ref(Version.v0_0_11);

const versionAOptions: Ref<Version[]> = ref([]);
const versionBOptions: Ref<Version[]> = ref([]);

export const useVersions = () => {
  watch([selectedVersionA, selectedVersionB], () => {
    updateOptionLists();
  });

  onMounted(() => {
    updateOptionLists();
  });

  function updateOptionLists() {
    // Only return the values (numbers)
    versionAOptions.value = Object.values(Version).filter(
      (f) => !isNaN(Number(f))
    ) as Version[];

    versionBOptions.value = Object.values(Version).filter(
      (f) => !isNaN(Number(f))
    ) as Version[];
  }

  async function versionData(version: Version): Promise<Item[]> {
    if (version === Version.v0_0_9) {
      const data = await import("../data/v0.0.9.json");
      const items = data.Items as Item[];
      return items;
    }

    if (version === Version.v0_0_10) {
      const data = await import("../data/v0.0.10.json");
      const items = data.Items as Item[];
      return items;
    }

    if (version === Version.v0_0_11) {
      const data = await import("../data/v0.0.11.json");
      const items = data.Items as Item[];
      return items;
    }

    throw new Error(`Unknown version: ${version}`);
  }

  return {
    selectedVersionA,
    selectedVersionB,
    versionAOptions,
    versionBOptions,
    versionData,
  };
};
