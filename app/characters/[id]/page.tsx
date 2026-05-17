import { getStarRailCharacters } from "@/lib/api/starrail";
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

export default async function CharacterPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const characters = await getStarRailCharacters();
	const character = characters.find((c) => c.id === id);
	if (!character) {
		return <div className="p-6">Character not found</div>;
	}

	const gradient =
		elementColors[character.element.name.toLowerCase()] ??
		"from-slate-500 to-slate-700";

	return (
		<main className="relative min-h-screen overflow-hidden bg-black text-white">
			{/* Background */}
			<div
				className={`
					absolute inset-0 bg-gradient-to-br ${gradient}
					opacity-20
				`}
			/>

			<Image
				src={character.splashart}
				alt={character.name}
				fill
				className="
					object-cover opacity-20 blur-sm
				"
				priority
			/>

			<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

			{/* Content */}
			<div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-6 py-10 lg:flex-row lg:items-center">
				{/* Left Side */}
				<div className="flex-1">
					<Link
						href="/"
						className="
							inline-flex items-center gap-2
							rounded-lg border border-white/10
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

						<div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
							<div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
								<p className="text-sm text-zinc-400">Element</p>

								<p className="mt-1 text-lg font-semibold">
									{character.element.name}
								</p>
							</div>

							<div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
								<p className="text-sm text-zinc-400">Path</p>

								<p className="mt-1 text-lg font-semibold">
									{character.path.name}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Right Side */}
				<div className="relative flex flex-1 items-center justify-center">
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
						width={700}
						height={900}
						className="
							relative z-10 object-contain
							drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]
						"
						priority
					/>
				</div>
			</div>
		</main>
	);
}
