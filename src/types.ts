export type Version = "v0.0.10" | "v0.0.11";

export async function versionData(version: Version): Promise<Item[]> {
  if (version === "v0.0.10") {
    const data = await import("./data/v0.0.10.json");
    const items = data.Items as Item[];
    return items;
  }

  if (version === "v0.0.11") {
    const data = await import("./data/v0.0.11.json");
    const items = data.Items as Item[];
    return items;
  }

  throw new Error(`Unknown version: ${version}`);
}

export interface Item {
  [name: string]: any;
  ID: number;
  Name: string;
  Description: string;
  Icon: string;
  EquipType: string;
  Weapon: Weapon | null;
  Ability: Ability | null;
  Consumable: Consumable | null;
  Modifiers: Modifier[];
  Source: string;
  Deprecated: boolean;
}

export interface Weapon {
  [name: string]: any;
  Damage: number;
  Class: string;
  Rate: number;
  Projectiles: number;
  StrengthScaling: number;
}

export interface Ability {
  [name: string]: any;
  Description: string;
  Other: string[];
  Range: number;
  Cost: number;
}

export interface Consumable {
  Heal: number;
  Mana: number;
  Modifiers: Modifier[];
}

export interface Modifier {
  Filter: string;
  Modifiers: string[];
}
