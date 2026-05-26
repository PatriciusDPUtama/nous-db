"use client";

import Image from "next/image";
import { useState } from "react";
import { CharacterSkill } from "@/types/character";

type Props = {
	skill: CharacterSkill;
	level?: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CharacterSkillCard({
	skill,
	level = 1,
}: Props) {
	const [selectedLevel, setSelectedLevel] = useState(level);

	const params = skill.params[selectedLevel - 1] ?? [];

	let parsedDesc = skill.desc;

	params.forEach((value, index) => {
		const key = index + 1;

		// Integer Percent
		parsedDesc = parsedDesc.replaceAll(
			`#${key}[i]%`,
			`${(value * 100).toFixed(0)}%`,
		);

		// Integer
		parsedDesc = parsedDesc.replaceAll(
			`#${key}[i]`,
			`${Math.round(value)}`,
		);

		// Float 1 Percent
		parsedDesc = parsedDesc.replaceAll(
			`#${key}[f1]%`,
			`${(value * 100).toFixed(1)}%`,
		);

		// Float 1
		parsedDesc = parsedDesc.replaceAll(
			`#${key}[f1]`,
			value.toFixed(1),
		);

		// Float 2 Percent
		parsedDesc = parsedDesc.replaceAll(
			`#${key}[f2]%`,
			`${(value * 100).toFixed(2)}%`,
		);

		// Float 2
		parsedDesc = parsedDesc.replaceAll(
			`#${key}[f2]`,
			value.toFixed(2),
		);
	});

	return (
		<div
			className="
				h-full overflow-hidden
				rounded-3xl
				border border-white/10
				bg-white/[0.03]
				backdrop-blur-xl
			"
		>
			{/* Top */}
			<div className="flex items-start gap-4 p-5">
				<div
					className="
						flex h-14 w-14 shrink-0
						items-center justify-center
						rounded-2xl
						bg-black/30
					"
				>
					<Image
						src={`${BASE_URL}/${skill.icon}`}
						alt={skill.name}
						width={42}
						height={42}
					/>
				</div>

				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-2">
						<h3
							className="
								truncate text-lg
								font-semibold text-white
							"
						>
							{skill.name}
						</h3>

						<div
							className="
								rounded-xl
								bg-cyan-400/10
								px-2 py-1
								text-[10px]
								font-medium
								text-cyan-300
							"
						>
							{skill.type_text}
						</div>
					</div>

					<p
						className="
							mt-1 text-sm
							leading-relaxed
							text-zinc-400
						"
					>
						{skill.effect_text}
					</p>
				</div>
			</div>

			{/* Slider */}
			<div className="px-5 pb-4">
				<div className="mb-2 flex items-center justify-between">
					<p className="text-xs text-zinc-500">
						Skill Level
					</p>

					<p className="text-sm font-semibold text-cyan-300">
						Lv. {selectedLevel}
					</p>
				</div>

				<input
					type="range"
					min={1}
					max={skill.params.length}
					value={selectedLevel}
					onChange={(e) =>
						setSelectedLevel(Number(e.target.value))
					}
					className="
						h-2 w-full
						cursor-pointer
						appearance-none
						rounded-full
						bg-white/10

						[&::-webkit-slider-thumb]:h-4
						[&::-webkit-slider-thumb]:w-4
						[&::-webkit-slider-thumb]:appearance-none
						[&::-webkit-slider-thumb]:rounded-full
						[&::-webkit-slider-thumb]:bg-cyan-400
					"
				/>
			</div>

			{/* Description */}
			<div
				className="
					border-t border-white/5
					bg-black/20
					p-5
				"
			>
				<p
					className="
						text-sm leading-7
						text-zinc-300
					"
				>
					{parsedDesc}
				</p>
			</div>

			{/* Bottom */}
			<div
				className="
					flex items-center justify-between
					border-t border-white/5
					bg-black/10
					px-5 py-3
				"
			>
				<div>
					<p className="text-[10px] text-zinc-500">
						LEVEL
					</p>

					<p className="text-sm font-semibold text-white">
						{selectedLevel}
					</p>
				</div>

				<div className="text-right">
					<p className="text-[10px] text-zinc-500">
						SCALING
					</p>

					<p className="text-sm font-semibold text-cyan-300">
						{((params[0] ?? 0) * 100).toFixed(0)}%
					</p>
				</div>
			</div>
		</div>
	);
}