export type RelicProperty = {
	type: string;
	value: number;
};

export type RelicSets = {
	id: string;
	name: string;
	desc: string[];
	properties: RelicProperty[][];
	icon: string;
};

export type Relic = {
	id: string;
	set: RelicSets;
	name: string;
	rarity: number;
	type: string;
	max_level: number;
	main_affix_id: string;
	sub_affix_id: string;
	icon: string;
};
