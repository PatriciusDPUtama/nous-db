"use client";

import { useMemo, useState } from "react";
import LightConeStatsCard from "@/components/LightConeStatsCard";
import MaterialsListCard from "@/components/MaterialsListCard";
import LightConeSkillCard from "@/components/LightConeSkillCard";
import { getMaterialsForLevel } from "@/lib/materials";
import { Item } from "@/types/item";

type Props = {
	lightcone: any;
	itemsData: Record<string, Item>;
};

export default function LightConeInfoSection({ lightcone, itemsData }: Props) {
	const [level, setLevel] = useState(80);
	const totalMaterials = useMemo(() => {
		return getMaterialsForLevel(lightcone.promotion.materials, level);
	}, [lightcone, level]);

	return (
		<>
			<LightConeStatsCard
				stats={lightcone.promotion.values}
				level={level}
				setLevel={setLevel}
			/>

			<MaterialsListCard
				totalMaterials={totalMaterials}
				itemsData={itemsData}
			/>

			<LightConeSkillCard
				skill={lightcone.skills}
			/>
		</>
	);
}
