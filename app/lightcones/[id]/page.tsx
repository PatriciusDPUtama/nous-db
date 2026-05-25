import { getStarRailLightCones, getStarRailItems } from "@/lib/api/starrail";
import LightConeInfoSection from "@/components/LightConeInfoSection";

import { Item } from "@/types/item";
import Image from "next/image";
import Link from "next/link";

export default async function LightConeDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const [lightcones, items] = await Promise.all([
		getStarRailLightCones(),
		getStarRailItems(),
	]);

	const lightcone = lightcones.find((l) => l.id === id);
	if (!lightcone) {
		return <div className="p-6">Lightcone not found</div>;
	}

	const itemsData: Record<string, Item> = {};
	items.forEach((item) => {
		itemsData[item.id] = item;
	});

	return (
		<main className="relative min-h-screen overflow-hidden text-white">
			{/* Content */}
			<div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-6 py-10 lg:flex-row lg:items-start">
				{/* Left Side */}
				<div className="lg:w-[40%]">
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
							<h1 className="text-2xl font-black tracking-tight">
								{lightcone.name}
							</h1>
							<Image
								src={lightcone.path.icon}
								alt={lightcone.path.name}
								width={36}
								height={36}
							/>
						</div>

						<div className="mt-4 flex gap-2">
							{Array.from({
								length: lightcone.rarity,
							}).map((_, i) => (
								<span key={i} className="text-2xl text-yellow-300">
									✦
								</span>
							))}
						</div>

						{/* Stats & Material */}
						<LightConeInfoSection lightcone={lightcone} itemsData={itemsData} />
					</div>
				</div>

				{/* Right Side */}
				<div className="relative lg:w-[60%] flex flex-col items-center justify-start gap-4">
					<div
						className={`
							absolute h-[500px] w-[500px]
							bg-gradient-to-br
							opacity-30 blur-3xl
						`}
					/>
					<Image
						src={lightcone.portrait}
						alt={lightcone.portrait}
						width={500}
						height={700}
						className="
							relative z-10 object-contain
							drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]
						"
						priority
					/>
					<div className="mt-4 max-w-md text-center text-sm text-zinc-300 lg:text-left">
						<p className="italic">{lightcone.desc}</p>
					</div>
				</div>
			</div>
		</main>
	);
}
