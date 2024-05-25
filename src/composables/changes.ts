import { Ability, Item, Weapon, versionData } from "../types";

export const useChanges = () => {
  const mostRecentChanges = async () => {
    const d1 = await versionData("v0.0.10");
    const d2 = await versionData("v0.0.11");

    const result: Catalog = {
      changedItems: [],
      newItems: [],
      removedItems: [],
    };
    for (const i1 of d1) {
      const i2 = d2.find((i) => i.ID === i1.ID);
      if (!i2) {
        result.removedItems.push(i1);
        continue;
      }

      const itemChanges = findChanges(i1, i2);
      if (
        itemChanges.additions.length ||
        itemChanges.changes.length ||
        itemChanges.removals.length
      ) {
        result.changedItems.push(itemChanges);
      }
    }

    for (const i2 of d2) {
      const i1 = d1.find((i) => i.ID === i2.ID);
      if (!i1) {
        result.newItems.push(i2);
      }
    }

    return result;
  };
  return { mostRecentChanges };
};

export interface Catalog {
  changedItems: ItemChanges[];
  newItems: Item[];
  removedItems: Item[];
}

export interface ItemChanges {
  ID: number;
  Name: string;
  Icon: string;
  additions: PropertyAddition[];
  changes: PropertyChange[];
  removals: PropertyRemoval[];
}

export interface PropertyAddition {
  prop: string;
  value: any;
}

export interface PropertyChange {
  prop: string;
  old: any;
  new: any;
}

export interface PropertyRemoval {
  prop: string;
  value: any;
}

function findChanges(i1: Item, i2: Item): ItemChanges {
  if (i1.ID !== i2.ID) {
    throw new Error("Items must have the same id");
  }

  const result: ItemChanges = {
    ID: i2.ID,
    Name: i2.Name,
    Icon: i2.Icon,
    additions: [],
    changes: [],
    removals: [],
  };

  // Simple properties
  const simpleProps = [
    "Name",
    "Description",
    "Icon",
    "EquipType",
    "Source",
    "Deprecated",
  ];
  for (const prop of simpleProps) {
    if (i1[prop] !== i2[prop]) {
      result.changes.push({ prop, old: i1[prop], new: i2[prop] });
    }
  }

  // Weapon
  if (i1.Weapon && i2.Weapon) {
    const weaponChanges = findWeaponChanges(i1.Weapon, i2.Weapon);
    if (weaponChanges.length) {
      weaponChanges.forEach((change) => {
        result.changes.push({
          prop: change.key,
          old: change.old,
          new: change.new,
        });
      });
    }
  }
  // There was a weapon before, not anymore.
  if (i1.Weapon && !i2.Weapon) {
    result.removals.push({ prop: "Weapon", value: i1.Weapon });
  }

  // There was no weapon before, but there is now.
  if (!i1.Weapon && i2.Weapon) {
    result.additions.push({ prop: "Weapon", value: i2.Weapon });
  }

  // Ability
  if (i1.Ability && i2.Ability) {
    const abilityChanges = findAbilityChanges(i1.Ability, i2.Ability);
    if (abilityChanges.length) {
      abilityChanges.forEach((change) => {
        result.changes.push({
          prop: change.key,
          old: change.old,
          new: change.new,
        });
      });
    }
  }
  // There was an ability before, not anymore.
  if (i1.Ability && !i2.Ability) {
    result.removals.push({ prop: "Ability", value: i1.Ability });
  }

  // There was no ability before, but there is now.
  if (!i1.Ability && i2.Ability) {
    result.additions.push({ prop: "Ability", value: i2.Ability });
  }

  return result;
}

function findAbilityChanges(a1: Ability, a2: Ability) {
  const changes = [];

  const simpleProps = ["Description", "Range", "Cost"];
  for (const prop of simpleProps) {
    if (a1[prop] !== a2[prop]) {
      const key = `Ability ${prop}`;
      changes.push({ key, old: a1[prop], new: a2[prop] });
    }
  }

  // Other. This is an array, so we need to compare each element.
  if (a1.Other.length !== a2.Other.length) {
    changes.push({
      key: "Ability",
      old: a1.Other,
      new: a2.Other,
    });
  } else {
    for (let i = 0; i < a1.Other.length; i++) {
      if (a1.Other[i] !== a2.Other[i]) {
        changes.push({
          key: `Ability ${i}`,
          old: a1.Other[i],
          new: a2.Other[i],
        });
      }
    }
  }

  return changes;
}

function findWeaponChanges(w1: Weapon, w2: Weapon) {
  const changes = [];

  const simpleProps = [
    "Damage",
    "Class",
    "Rate",
    "Projectiles",
    "StrengthScaling",
  ];
  for (const prop of simpleProps) {
    if (w1[prop] !== w2[prop]) {
      const key = `Weapon ${prop}`;
      changes.push({ key, old: w1[prop], new: w2[prop] });
    }
  }

  return changes;
}
