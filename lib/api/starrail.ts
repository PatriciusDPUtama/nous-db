import { Character, CharacterPromotion } from "@/types/character";
import { Element } from "@/types/element";
import { Path } from "@/types/path";
import { Item } from "@/types/item";
import { LightCone, LightConePromotion } from "@/types/lightcone";

import {
	StarRailCharacter,
	StarRailElement,
	StarRailPath,
	StarRailItem,
	StarRailLightCone,
} from "@/types/starrail";

const BASE_URL = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/index_new/en";

export async function getStarRailItems(): Promise<Item[]> {
	const response = await fetch(`${BASE_URL}/items.json`);

	const data: Record<string, StarRailItem> =
		await response.json();

	return Object.values(data).map((item) => ({
		...item,
		icon: `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${item.icon}`,
	}));
}

export async function getStarRailPaths(): Promise<Path[]> {
	const response = await fetch(`${BASE_URL}/paths.json`);
	const data: Record<string, StarRailPath> = await response.json();

	return Object.values(data).map((path) => ({
		...path,
		icon: `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${path.icon}`,
	}));
}

export async function getStarRailElements(): Promise<Element[]> {
	const response = await fetch(`${BASE_URL}/elements.json`);
	const data: Record<string, StarRailElement> = await response.json();

	return Object.values(data).map((element) => ({
		...element,
		icon: `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${element.icon}`,
	}));
}

export async function getStarRailCharacterPromotions(): Promise<CharacterPromotion[]> {
	const response = await fetch(`${BASE_URL}/character_promotions.json`);
	const data: Record<string, any> = await response.json();

	return Object.values(data).map((promotion: any) => ({
		character_id: promotion.id,
		values: promotion.values,
		materials: promotion.materials,
	}));
}

export async function getStarRailLightConePromotions(): Promise<LightConePromotion[]> {
	const response = await fetch(`${BASE_URL}/light_cone_promotions.json`);
	const data: Record<string, any> = await response.json();

	return Object.values(data).map((promotion: any) => ({
		lightcone_id: promotion.id,
		values: promotion.values,
		materials: promotion.materials,
	}));
}

export async function getStarRailCharacters(): Promise<Character[]> {
	const [charactersResponse, elements, paths, promotions,] = await Promise.all([
		fetch(`${BASE_URL}/characters.json`),
		getStarRailElements(),
		getStarRailPaths(),
		getStarRailCharacterPromotions(),
	]);

	const charactersData: Record<string, StarRailCharacter> =
		await charactersResponse.json();

	const elementsData = Object.fromEntries(
		elements.map((element) => [element.id, element]),
	);

	const pathsData = Object.fromEntries(
		paths.map((path) => [path.id, path]),
	);

	const promotionsData = Object.fromEntries(
		promotions.map((promotion) => [
			promotion.character_id,
			promotion,
		]),
	);

	return Object.values(charactersData)
		.map((char) => ({
			id: String(char.id),
			name: char.tag.startsWith("player")
				? "Trailblazer"
				: char.name,
			rarity: char.rarity,
			element: elementsData[char.element]!,
			path: pathsData[char.path]!,
			image: `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${char.preview}`,
			splashart: `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${char.portrait}`,
			icon: `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${char.icon}`,
			energy: char.max_sp,
			promotion: promotionsData[String(char.id)],
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getStarRailLightCones(): Promise<LightCone[]> {
	const [lightconeResponse, paths, promotions] = await Promise.all([
		fetch(`${BASE_URL}/light_cones.json`),
		getStarRailPaths(),
		getStarRailLightConePromotions(),
	]);

	const lightconeData: Record<string, StarRailLightCone> =
		await lightconeResponse.json();

	const pathsData = Object.fromEntries(
		paths.map((path) => [path.id, path]),
	);

	const promotionsData = Object.fromEntries(
		promotions.map((promotion) => [
			promotion.lightcone_id,
			promotion,
		]),
	);

	return Object.values(lightconeData).map((lc) => ({
		...lc,
		path: pathsData[lc.path]!,
		icon: `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${lc.icon}`,
		preview: `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${lc.preview}`,
		portrait: `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${lc.portrait}`,
		promotion: promotionsData[String(lc.id)],
	})).sort((a, b) => a.name.localeCompare(b.name));
}
