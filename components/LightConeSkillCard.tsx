"use client";

import { LightConeSkill } from "@/types/lightcone";

type Props = {
	skill: LightConeSkill;
};

export default function LightConeSkillCard({
	skill,
}: Props) {
	let parsedDesc = skill.desc;

	const firstRank = skill.params[0] ?? [];

	firstRank.forEach((_, index) => {
		const key = index + 1;
		const values = skill.params.map(
			(rank) => rank[index],
		);

		// Integer Percent
		parsedDesc = parsedDesc.replaceAll(
			`#${key}[i]%`,
			values
				.map(
					(v) =>
						`${(v * 100).toFixed(0)}%`,
				)
				.join(" / "),
		);

		// Integer
		parsedDesc = parsedDesc.replaceAll(
			`#${key}[i]`,
			values
				.map((v) => Math.round(v))
				.join(" / "),
		);

		// Float 1 Percent
		parsedDesc = parsedDesc.replaceAll(
			`#${key}[f1]%`,
			values
				.map(
					(v) =>
						`${(v * 100).toFixed(1)}%`,
				)
				.join(" / "),
		);

		// Float 1
		parsedDesc = parsedDesc.replaceAll(
			`#${key}[f1]`,
			values
				.map((v) => v.toFixed(1))
				.join(" / "),
		);

		// Float 2 Percent
		parsedDesc = parsedDesc.replaceAll(
			`#${key}[f2]%`,
			values
				.map(
					(v) =>
						`${(v * 100).toFixed(2)}%`,
				)
				.join(" / "),
		);

		// Float 2
		parsedDesc = parsedDesc.replaceAll(
			`#${key}[f2]`,
			values
				.map((v) => v.toFixed(2))
				.join(" / "),
		);
	});

	return (
		<div
			className="
				mt-6
				overflow-hidden rounded-3xl
				border border-white/10
				bg-white/[0.03]
				backdrop-blur-xl
			"
		>
			<div className="p-5">
				<h3 className="text-lg font-semibold text-white">
					{skill.skill}
				</h3>

				<p className="mt-1 text-sm text-zinc-400">
					Light Cone Ability
				</p>
			</div>

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
		</div>
	);
}