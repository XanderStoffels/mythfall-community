import { Version } from "./composables/versions";

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
