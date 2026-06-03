"use client";

import { LightConeSkill } from "@/types/lightcone";

type Props = {
	skill: LightConeSkill;
};

export default function LightConeSkillCard({ skill }: Props) {
	let parsedDesc = skill.desc;

	const firstRank = skill.params[0] ?? [];

	firstRank.forEach((_, index) => {
		const key = index + 1;
		const values = skill.params.map((rank) => rank[index]);

		parsedDesc = parsedDesc.replaceAll(
			`#${key}[i]%`,
			values.map((v) => `${(v * 100).toFixed(0)}%`).join(" / "),
		);

		parsedDesc = parsedDesc.replaceAll(
			`#${key}[i]`,
			values.map((v) => Math.round(v)).join(" / "),
		);

		parsedDesc = parsedDesc.replaceAll(
			`#${key}[f1]%`,
			values.map((v) => `${(v * 100).toFixed(1)}%`).join(" / "),
		);

		parsedDesc = parsedDesc.replaceAll(
			`#${key}[f1]`,
			values.map((v) => v.toFixed(1)).join(" / "),
		);

		parsedDesc = parsedDesc.replaceAll(
			`#${key}[f2]%`,
			values.map((v) => `${(v * 100).toFixed(2)}%`).join(" / "),
		);

		parsedDesc = parsedDesc.replaceAll(
			`#${key}[f2]`,
			values.map((v) => v.toFixed(2)).join(" / "),
		);
	});

	return (
		<div className="mt-6 max-w-md">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-bold text-white">{skill.skill}</h2>
			</div>

			{/* Description */}
			<div
				className="
					mt-4
					rounded-xl border border-white/10
					bg-white/5
					p-4
					backdrop-blur-md
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
		</div>
	);
}
