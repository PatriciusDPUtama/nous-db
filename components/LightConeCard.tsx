import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { LightCone } from "@/types/lightcone";

const rarityStyles: Record<number, string> = {
	3: "border-blue-500/40 shadow-blue-500/10",
	4: "border-purple-500/40 shadow-purple-500/20",
	5: "border-yellow-400/50 shadow-yellow-400/30",
};

function LightConeCard({
	id,
	name,
	rarity,
	path,
	portrait,
}: LightCone) {
	const rarityClass =
		rarityStyles[rarity] ?? "border-white/10 shadow-black/20";

	return (
		<Link href={`/lightcones/${id}`} className="group block">
			<div
				className={`
					relative
					overflow-hidden
					rounded-none
					border
					bg-gradient-to-b from-zinc-900 to-black
					${rarityClass}
					shadow-lg
					transform-gpu
					transition-all duration-300 ease-out
					group-hover:shadow-2xl
				`}
			>
				{/* Portrait */}
				<div className="relative overflow-hidden bg-black">
					<Image
						src={portrait}
						alt={name}
						width={512}
						height={768}
						loading="lazy"
						sizes="(max-width: 768px) 100vw, 30vw"
						className="
							w-full
							h-auto
							object-contain
							transition-transform duration-300 ease-out
							group-hover:scale-[1.03]
						"
					/>

					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

					{/* Hover Glow */}
					<div
						className="
							absolute inset-0
							opacity-0
							group-hover:opacity-100
							transition-opacity duration-300
							bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]
						"
					/>

					{/* Path Icon */}
					<div className="absolute top-2 right-2 z-20">
						<div className="rounded-xl bg-black/50 backdrop-blur-sm p-1.5 border border-white/10">
							<Image
								src={path.icon}
								alt={path.name}
								width={18}
								height={18}
								className="object-contain"
							/>
						</div>
					</div>
				</div>

				{/* Bottom Info */}
				<div className="border-t border-white/10 bg-black/50 px-3 py-3 h-[78px] flex flex-col justify-between">
					<p className="text-[10px] tracking-[0.25em] text-white/40 uppercase text-center">
						Light Cone
					</p>

					<div className="h-[44px] flex items-center">
						<h2
							className="
								w-full
								text-sm
								font-semibold
								text-white/90
								leading-snug
								line-clamp-2
								text-center
								tracking-tight
							"
						>
							{name}
						</h2>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default memo(LightConeCard);