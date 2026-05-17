import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { Character } from "@/types/character";

const elementBorders: Record<string, string> = {
	fire: "border-red-500/70",
	ice: "border-cyan-400/70",
	lightning: "border-purple-700/70",
	wind: "border-emerald-500/70",
	quantum: "border-violet-500/70",
	imaginary: "border-yellow-400/70",
	physical: "border-zinc-400/70",
};

function CharacterCard({
	id,
	name,
	rarity,
	element,
	path,
	image,
}: Character) {
	const borderColor =
		elementBorders[element.name.toLowerCase()] ?? "border-white/10";

	return (
		<Link href={`/characters/${id}`} className="group block">
			<div
				className={`
					relative
					aspect-[3/4]
					overflow-hidden
					rounded-2xl
					bg-zinc-900/70
					border-3
					${borderColor}
					shadow-lg
					transform-gpu
					will-change-transform
					transition-transform
					duration-200
					ease-out
					group-hover:-translate-y-1
					[content-visibility:auto]
				`}
			>
				{/* Background Image */}
				<Image
					src={image}
					alt={name}
					fill
					loading="lazy"
					quality={75}
					sizes="(max-width: 768px) 100vw, 20vw"
					className="
						object-cover
						transform-gpu
						will-change-transform
						transition-transform
						duration-300
						ease-out
						group-hover:scale-105
					"
				/>

				{/* Overlay */}
				<div
					className="
						absolute inset-0
						bg-gradient-to-t
						from-black/90
						via-black/25
						to-black/5
					"
				/>

				{/* Soft top glow */}
				<div
					className="
						absolute inset-0
						bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_40%)]
					"
				/>

				{/* Icons */}
				<div className="absolute top-4 left-4 right-4 flex items-center justify-between">
					<Image
						src={path.icon}
						alt={path.name}
						width={28}
						height={28}
						className="object-contain opacity-90"
					/>

					<Image
						src={element.icon}
						alt={element.name}
						width={28}
						height={28}
						className="object-contain opacity-90"
					/>
				</div>

				{/* Footer */}
				<div className="absolute bottom-0 left-0 w-full p-5 text-white">
					<h2 className="text-2xl font-bold">{name}</h2>

					<div className="mt-1 flex gap-1">
						{Array.from({ length: rarity }).map((_, i) => (
							<span key={i} className="text-yellow-300 text-sm">
								✦
							</span>
						))}
					</div>
				</div>
			</div>
		</Link>
	);
}

export default memo(CharacterCard);