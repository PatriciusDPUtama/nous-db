import { Element } from "./element";
import { Path } from "./path";

export type Character = {
    id: string;
    name: string;
    rarity: number;
    element: Element;
    path: Path;
    image: string;
    splashart: string;
    icon: string;
    energy: number;
    ranks: string[];
    skills: string[];
    promotion: CharacterPromotion;
};

export type CharacterStatValue = {
    base: number;
    step: number;
};

export type CharacterStats = {
    hp: CharacterStatValue;
    atk: CharacterStatValue;
    def: CharacterStatValue;
    spd: CharacterStatValue;
    taunt: CharacterStatValue;
    crit_rate: CharacterStatValue;
    crit_dmg: CharacterStatValue;
};

export type CharacterMaterial = {
    id: string;
    num: number;
};

export type CharacterPromotion = {
	character_id: string;
	values: CharacterStats[];
	materials: CharacterMaterial[][];
};