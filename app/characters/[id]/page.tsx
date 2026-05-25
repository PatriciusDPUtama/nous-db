import { getStarRailCharacters, getStarRailItems } from "@/lib/api/starrail";
import CharacterInfoSection from "@/components/CharacterInfoSection";
import CharacterSkillCard from "@/components/CharacterSkillCard";

import { Item } from "@/types/item";
import Image from "next/image";
import Link from "next/link";

const elementColors: Record<string, string> = {
	fire: "from-red-500 to-orange-400",
	ice: "from-cyan-400 to-blue-500",
	lightning: "from-purple-500 to-fuchsia-600",
	wind: "from-green-400 to-emerald-500",
	quantum: "from-fuchsia-500 to-violet-500",
	imaginary: "from-yellow-400 to-amber-500",
	physical: "from-gray-400 to-zinc-500",
};

export default async function CharacterDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const [characters, items] = await Promise.all([
		getStarRailCharacters(),
		getStarRailItems(),
	]);

	const character = characters.find((c) => c.id === id);

	if (!character) {
		return <div className="p-6">Character not found</div>;
	}

	const itemsData: Record<string, Item> = {};

	items.forEach((item) => {
		itemsData[item.id] = item;
	});

	const gradient =
		elementColors[character.element.name.toLowerCase()] ??
		"from-slate-500 to-slate-700";

	return (
		<main className="relative min-h-screen overflow-hidden text-white">

			{/* Content */}
			<div className="relative z-10 mx-auto max-w-7xl px-6 py-10">
				{/* TOP SECTION */}
				<div className="flex flex-col gap-10 lg:flex-row lg:items-start">
					{/* LEFT */}
					<div className="lg:w-[40%]">
						<Link
							href="/"
							className="
								inline-flex items-center gap-2
								rounded-xl border border-white/10
								bg-white/5 px-4 py-2
								text-sm text-zinc-300
								backdrop-blur-md
								transition hover:bg-white/10
							"
						>
							← Back
						</Link>

						<div className="mt-8">
							<div className="flex items-center gap-3">
								<h1 className="text-5xl font-black tracking-tight">
									{character.name}
								</h1>

								<Image
									src={character.element.icon}
									alt={character.element.name}
									width={36}
									height={36}
								/>

								<Image
									src={character.path.icon}
									alt={character.path.name}
									width={36}
									height={36}
								/>
							</div>

							<div className="mt-4 flex gap-2">
								{Array.from({
									length: character.rarity,
								}).map((_, i) => (
									<span key={i} className="text-2xl text-yellow-300">
										✦
									</span>
								))}
							</div>

							{/* INFO */}
							<div className="mt-8">
								<CharacterInfoSection
									character={character}
									itemsData={itemsData}
								/>
							</div>
						</div>
					</div>

					{/* RIGHT */}
					<div className="relative flex flex-col items-center justify-start gap-4 lg:w-[60%]">
						<div
							className={`
								absolute h-[500px] w-[500px]
								bg-gradient-to-br ${gradient}
								opacity-30 blur-3xl
							`}
						/>

						<Image
							src={character.splashart}
							alt={character.name}
							width={600}
							height={800}
							className="
								relative z-10 object-contain
								drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]
							"
							priority
						/>

						<div
							className="
								mt-6 max-w-md
								rounded-2xl
								border border-white/10
								bg-white/[0.03]
								p-4
								text-center text-sm
								text-zinc-300
								backdrop-blur-md
								lg:text-left
							"
						>
							<p className="italic">No description available.</p>
						</div>
					</div>
				</div>

				{/* SKILLS */}
				<div className="mt-6">
					<h2 className="text-lg font-bold text-white">
						Skills
					</h2>
				</div>

				<div
					className="
						grid w-full
						mt-3
						grid-cols-2
						gap-6
						items-start
					"
				>
					{character.skills.map((skill) => (
						<div key={skill.id} className="w-full min-w-0">
							<CharacterSkillCard skill={skill} level={1} />
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
