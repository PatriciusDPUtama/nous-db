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
	promotion: CharacterPromotion;
	skills: CharacterSkill[];
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

export type CharacterSkill = {
	id: string;
	name: string;
	max_level: number;
	type: string;
	type_text: string;
	effect: string;
	effect_text: string;
	simple_desc: string;
	desc: string;
	params: number[][];
	icon: string;
};
