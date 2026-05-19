import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { Item } from "@/types/item";

const rarityStyles: Record<number, string> = {
	1: "border-gray-500/40 bg-gray-500/10",
	2: "border-green-500/40 bg-green-500/10",
	3: "border-blue-500/40 bg-blue-500/10",
	4: "border-purple-500/40 bg-purple-500/10",
	5: "border-yellow-400/50 bg-yellow-400/10 shadow-yellow-400/20",
};

function ItemCard({ id, name, rarity, type, icon }: Item) {
	const rarityClass = rarityStyles[rarity] ?? "border-white/10 bg-white/5";

	return (
		<Link href={`/items/${id}`} className="group block">
			<div
				className={`
					relative
					aspect-square
					overflow-visible
					rounded-2xl
					border
					${rarityClass}
					shadow-lg
					transform-gpu
					transition-all duration-200 ease-out
					group-hover:-translate-y-1
				`}
			>
				{/* Item Icon */}
				<div className="absolute inset-0 flex items-center justify-center">
					<Image
						src={icon}
						alt={name}
						width={80}
						height={80}
						className="object-contain transition-all duration-200 group-hover:scale-95 group-hover:opacity-40"
					/>
				</div>

				{/* Hover Name Overlay */}
				<div
					className="
						absolute inset-0
						z-30
						flex items-center justify-center
						opacity-0
						group-hover:opacity-100
						transition-opacity duration-200
						pointer-events-none
					"
				>
					<div
						className="
							max-w-[85%]
							rounded-lg
							bg-black/60
							backdrop-blur-md
							px-3
							py-2
							shadow-xl
							border border-white/10
						"
					>
						<p
							className="
								text-[10px]
								font-small
								text-white
								text-center
								leading-tight
								break-words
							"
						>
							{name}
						</p>
					</div>
				</div>

				{/* Soft glow layer */}
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
			</div>
		</Link>
	);
}

export default memo(ItemCard);
