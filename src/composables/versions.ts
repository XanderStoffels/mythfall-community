import { Ref, onMounted, ref, watch } from "vue";
import { Item } from "../types";

export enum Version {
  v0_0_9 = 0,
  v0_0_10 = 1,
  v0_0_11 = 2,
  v0_0_12 = 3,
}

export interface UpdateNotes {
  fixes: string[];
  features: string[];
}

const selectedVersionA: Ref<Version | null> = ref(Version.v0_0_11);
const selectedVersionB: Ref<Version | null> = ref(Version.v0_0_12);

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

  async function versionData(
    version: Version
  ): Promise<{ items: Item[]; updateNotes: UpdateNotes }> {
    if (version === Version.v0_0_9) {
      const data = await import("../data/v0.0.9.json");
      const items = data.Items as Item[];
      const updateNotes = {
        fixes: [
          "Dungeons no longer let you enter if you have already entered once",
          "Experience required to level up is a bit higher now",
          "Vitality gained from leveling up halved (New max vitality: 25)",
          "There was a panic in the proxy that occasionally logged people out",
          "Fixed lighting which had broken for dungeons in last rework",
          "Fixed bug in blunderbuss description",
          "Wiki now contains more precise data exported from the game",
          "Monsters would sometimes spawn inside certain other objects",
        ],
        features: [],
      };

      return { items, updateNotes };
    }

    if (version === Version.v0_0_10) {
      const data = await import("../data/v0.0.10.json");
      const items = data.Items as Item[];
      const updateNotes = {
        fixes: [
          "More item rebalance changes. Mostly into the positive direction this time. Wiki is updated: You can see the diff here: https://github.com/unitoftime/mythfall-wiki/commit/9c8c7e6a8463e641ffdd4af388390b9732f63760?diff=unified&w=0",
          "Potion rework: Potions now heal a maximum of 2 instantly, but add a regeneration effect on your character. The regeneration effect heals over time. 1s = 1hp (Effects show below the XP/Honor bar and have tooltips too)",
          "Regeneration effect stacks. So if you drink 2 large potions at the same time you'll now get 4 instant heal and 8 regeneration stacks",
        ],
        features: [
          "Added a few midgame items: Rockshard gear and a full staff progression (5 new staves. You can craft them at the new wizard tower south of town)",
          "HP and cooldown bar now shows below player when your health isn't full (ie in combat)",
          "Mobs in dungeon rooms are a bit smarter so they won't attack on the same tick",
          "Boss drop threshold is now scaled based on player strength level. The goal of this is to let newer players have a better chance of getting drops",
          "You can now rebind chat button",
          "Made Coolcrab Grotto dungeon a bit easier",
        ],
      };

      return { items, updateNotes };
    }

    if (version === Version.v0_0_11) {
      const data = await import("../data/v0.0.11.json");
      const items = data.Items as Item[];
      const updateNotes = {
        features: [
          "New Dungeon: Chamber of the Awakened (Just a warning: It's the hardest dungeon in the game right now)",
          "Guardian tear now drops from most area bosses (who guard portals)",
          "Add Jewelry shop and initial ring progression",
          "Change a few items: https://github.com/unitoftime/mythfall-wiki/commit/70c5de931d0d4b0f3e3dc66d614ddbf5779e96dc",
          "Increase staff damage output",
        ],
        fixes: [
          "Shop scrollbars now reset to 0 if you leave and enter the shop",
          "Healthbar now shows in every area except for town",
        ],
      };

      return { items, updateNotes };
    }

    if (version === Version.v0_0_12) {
      const data = await import("../data/v0.0.12.json");
      const items = data.Items as Item[];
      const updateNotes = {
        features: [
          "Change loot drop algorithm to handle large groups of players. When in big groups, your chance of getting drops scales with how much damage you deal",
          "Change sphere stability to show a percentage. It also now scales with number of players",
          "(Experimental) Screen Scale: Add DPI scaling in settings menu (Game tries to automatically detect)",
          "Minimap Size: Let user make minimap smaller or bigger",
          "Inventory Size: Let user make inventory smaller or bigger",
          "(Experimental) Opacity mode: Set a threshold to hide allies if enough players are nearby (Warning: There's a bug where you don't see your own damage numbers when in this mode)",
          "(Experimental) Loot Hover Mode: Hover over lootbags to see what is inside (Note: Add weirdly shaped items below town to facilitate (hopefully) safer trades)",
          "Add signs near shops to indicate what they are",
          "Range stat now shows on weapons",
          "Chat now expands to show more entries when using the text input field",
          "Item Updates: https://github.com/unitoftime/mythfall-wiki/commit/0b3a361feb20be72fbcccd20d011a4fd9ec6fe18",
        ],
        fixes: [
          "Game will prevent browser navigation buttons from mouse. Will also allow them for rebinding",
          "Switching gear to low vitality and then back up will give you less HP back",
          "Change crafting menus to show 'Missing Resources' when you cannot craft",
          "Increase pirate cove drop rate in beach biome",
          "New final phase for Alivarg. Alivarg projectiles now pierce (This means barrier will not work)",
        ],
      };
      return { items, updateNotes };
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
