import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { Character } from "@/types/character";

const elementBorders: Record<string, string> = {
	fire: "border-red-500/40",
	ice: "border-cyan-400/40",
	lightning: "border-purple-500/40",
	wind: "border-emerald-500/40",
	quantum: "border-violet-500/40",
	imaginary: "border-yellow-400/40",
	physical: "border-zinc-400/40",
};

function CharacterCard({ id, name, rarity, element, path, image }: Character) {
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
					bg-zinc-950/70
					border
					${borderColor}
					shadow-lg
					transform-gpu
					transition-transform duration-200 ease-out
					group-hover:-translate-y-1
				`}
			>
				{/* Character Image */}
				<Image
					src={image}
					alt={name}
					fill
					loading="lazy"
					sizes="(max-width: 768px) 100vw, 20vw"
					className="object-cover transition-transform duration-300 group-hover:scale-105"
				/>

				{/* NOUS Scan Overlay */}
				<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
					<div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-pulse" />
				</div>

				{/* Soft System Glow */}
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,240,0.04),transparent_50%)]" />

				{/* Top System Icons */}
				<div className="absolute top-3 left-3 right-3 flex justify-between opacity-90">
					<Image
						src={path.icon}
						alt={path.name}
						width={24}
						height={24}
						className="object-contain"
					/>

					<Image
						src={element.icon}
						alt={element.name}
						width={24}
						height={24}
						className="object-contain"
					/>
				</div>

				{/* Footer */}
				<div className="absolute bottom-0 w-full p-3 text-center">
					<p className="text-[10px] tracking-widest text-white/40">
						ENTITY NODE
					</p>
					<h2 className="text-sm font-semibold text-white/90">{name}</h2>
				</div>
			</div>
		</Link>
	);
}

export default memo(CharacterCard);
