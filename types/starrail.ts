export type StarRailCharacter = {
	id: number;
	name: string;
	rarity: number;
	tag: string;
	element: string;
	path: string;
	icon: string;
	preview: string;
	portrait: string;
	max_sp: number;
	skills: string[];
};

export type StarRailElement = {
	id: string;
	name: string;
	icon: string;
	color: string;
};

export type StarRailPath = {
	id: string;
	name: string;
	icon: string;
	icon_middle: string;
	icon_small: string;
};

export type StarRailItem = {
	id: string;
	name: string;
	type: string;
	rarity: number;
	sub_type: string;
	icon: string;
	come_from: string[];
};

export type StarRailLightCone = {
	id: string;
	name: string;
	rarity: number;
	path: string;
	desc: string;
	icon: string;
	preview: string;
	portrait: string;
};

export type StarRailRelic = {
	id: string;
	set_id: string;
	name: string;
	rarity: number;
	type: string;
	max_level: number;
	main_affix_id: string;
	sub_affix_id: string;
	icon: string;
};
