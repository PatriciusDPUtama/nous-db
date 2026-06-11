"use client";

import Image from "next/image";
import { useState } from "react";
import { CharacterSkill } from "@/types/character";

type Props = {
	skill: CharacterSkill;
	level_basic?: number;
	level_skill?: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CharacterSkillCard({
	skill,
	level_basic = 6,
	level_skill = 10,
}: Props) {
	const [selectedLevelBasic, setSelectedLevelBasic] = useState(level_basic);
	const [selectedLevelSkill, setSelectedLevelSkill] = useState(level_skill);

	const isBasic = skill.type === "Normal" || skill.type_text === "Basic ATK";
	const isTechnique = skill.type === "Maze" || skill.type_text === "Technique";

	const selectedLevel = isTechnique
		? 1
		: isBasic
			? selectedLevelBasic
			: selectedLevelSkill;

	const setSelectedLevel = isBasic
		? setSelectedLevelBasic
		: setSelectedLevelSkill;

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
				flex h-full flex-col
				overflow-hidden
				rounded-2xl
				border border-white/10
				bg-white/[0.03]
				backdrop-blur-xl
			"
		>
			{/* Top */}
			<div className="flex items-start gap-4 p-5">
				<div
					className="
						flex h-12 w-12 shrink-0
						items-center justify-center
						rounded-xl
						bg-black/30
					"
				>
					<Image
						src={`${BASE_URL}/${skill.icon}`}
						alt={skill.name}
						width={36}
						height={36}
					/>
				</div>

				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-2">
						<h3
							className="
								truncate text-medium
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
								font-sm
								text-cyan-300
							"
						>
							{skill.type_text}
						</div>
					</div>

					<p
						className="
							mt-1 text-xs
							leading-relaxed
							text-zinc-400
						"
					>
						{skill.effect_text}
					</p>
				</div>
			</div>

			{/* Description */}
			<div
				className="
					flex-1
					border-t border-white/5
					bg-black/20
					p-5
				"
			>
				<p
					className="
						text-xs leading-7
						text-zinc-300
					"
				>
					{parsedDesc}
				</p>
			</div>

			{/* Bottom */}
			<div
				className="
					border-t border-white/5
					bg-black/10
				"
			>
				{/* Slider */}
				{!isTechnique && (
					<div className="px-5 pt-4 pb-4">
						<div className="mb-2 flex items-center justify-between">
							<p className="text-xs text-zinc-500">
								Skill Level
							</p>

							<p className="text-xs font-semibold text-cyan-300">
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
				)}
			</div>
		</div>
	);
}