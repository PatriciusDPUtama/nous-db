import { Path } from "./path";

export type LightCone = {
	id: string;
	name: string;
    rarity : number;
    path : Path
    desc : string;
	icon: string;
    preview : string;
    portrait : string;
    promotion: LightConePromotion;
    skills: LightConeSkill;
};

export type LightConeStatValue = {
    base: number;
    step: number;
};

export type LightConeStats = {
    hp: LightConeStatValue;
    atk: LightConeStatValue;
    def: LightConeStatValue;
};

export type LightConeMaterial = {
    id: string;
    num: number;
};

export type LightConePromotion = {
    lightcone_id: string;
    values: LightConeStats[];
    materials: LightConeMaterial[][];
};

export type LightConeSkill = {
	id: string;
	skill: string;
	desc: string;
	params: number[][];
}

