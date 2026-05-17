export type StarRailCharacter = {
	id: number;
	name: string;
	rarity : string;
	tag : string;
	element: string;
	path: string;
	icon : string;
	preview : string;
	portrait : string;
};

export type StarRailElement = {
	id: string;
	name: string;
	icon : string;
};

export type StarRailPath = {
	id: string;
	name: string;
	icon : string;
	icon_middle? : string;
	icon_small? : string;
};