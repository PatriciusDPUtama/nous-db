"use client";

import { useMemo, useState } from "react";
import CharacterStatsCard from "@/components/CharacterStatsCard";
import MaterialsListCard from "@/components/MaterialsListCard";
import { getMaterialsForLevel } from "@/lib/materials";
import { Item } from "@/types/item";

type Props = {
	character: any;
	itemsData: Record<string, Item>;
};

export default function CharacterInfoSection({ character, itemsData }: Props) {
	const [level, setLevel] = useState(80);

	const totalMaterials = useMemo(() => {
		return getMaterialsForLevel(character.promotion.materials, level);
	}, [character, level]);

	return (
		<>
			<CharacterStatsCard
				stats={character.promotion.values}
				level={level}
				setLevel={setLevel}
			/>

			<MaterialsListCard
				totalMaterials={totalMaterials}
				itemsData={itemsData}
			/>
		</>
	);
}
