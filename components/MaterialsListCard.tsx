import Image from "next/image";
import { formatNumber } from "@/lib/format";
import { rarityStyles } from "@/lib/rarity";
import { Item } from "@/types/item";

type MaterialsListProps = {
	totalMaterials: Record<string, number>;
	itemsData: Record<string, Item>;
};


export default function MaterialsListCard({
	totalMaterials,
	itemsData,
}: MaterialsListProps) {
	return (
		<div className="mt-6">
			{/* Title */}
			<h2 className="text-lg font-bold text-white">
				Ascension Materials
			</h2>

			{/* Grid */}
			<div className="mt-3 flex flex-wrap gap-2">
				{Object.entries(totalMaterials).map(([materialId, amount]) => {
					const material = itemsData[materialId];
					if (!material) return null;

					const rarityClass = rarityStyles[material.rarity ?? 1];

					return (
						<div
							key={materialId}
							className="group relative flex flex-col items-center"
						>
							{/* Icon container */}
							<div
								className={`
									rounded-xl border backdrop-blur-md p-1.5 transition
									group-hover:scale-105 group-hover:brightness-110
									${rarityClass}
								`}
							>
								<Image
									src={material.icon}
									alt={material.name}
									width={40}
									height={40}
									className="rounded-lg"
								/>
							</div>

							{/* Amount */}
							<p className="mt-1 text-xs font-semibold text-zinc-300">
								× {formatNumber(amount)}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}