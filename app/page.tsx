"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CharacterCard from "@/components/CharacterCard";
import StarBackground from "@/components/StarBackground";
import { Character } from "@/types/character";
import { Element } from "@/types/element";
import { Path } from "@/types/path";
import {
	getStarRailElements,
	getStarRailCharacters,
	getStarRailPaths,
} from "@/lib/api/starrail";

export default function Home() {
	const [selectedElements, setSelectedElements] = useState<string[]>([]);
	const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
	const [selectedRarity, setSelectedRarity] = useState<number | null>(null);

	const [search, setSearch] = useState("");
	const [characters, setCharacters] = useState<Character[]>([]);
	const [elements, setElements] = useState<Element[]>([]);
	const [paths, setPaths] = useState<Path[]>([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);

				const [charactersData, elementsData, pathsData] = await Promise.all([
					getStarRailCharacters(),
					getStarRailElements(),
					getStarRailPaths(),
				]);

				setCharacters(charactersData);
				setElements(elementsData);
				setPaths(pathsData);
			} catch (error) {
				setError("Failed to load data");

				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	if (error) {
		return <div className="p-6 text-red-500">{error}</div>;
	}

	if (loading) {
		return <div className="p-6">Loading characters...</div>;
	}

	function toggleElement(element: string) {
		setSelectedElements((prev) =>
			prev.includes(element)
				? prev.filter((e) => e !== element)
				: [...prev, element],
		);
	}

	function togglePath(path: string) {
		setSelectedPaths((prev) =>
			prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path],
		);
	}

	function toggleRarity(rarity: number) {
		setSelectedRarity((prev) => (prev === rarity ? null : rarity));
	}

	function resetFilters() {
		setSelectedElements([]);
		setSelectedPaths([]);
		setSelectedRarity(null);
		setSearch("");
	}

	const filteredCharacters = characters.filter((char) => {
		const matchesElement =
			selectedElements.length === 0 ||
			selectedElements.includes(char.element.name);
		const matchesPath =
			selectedPaths.length === 0 || selectedPaths.includes(char.path.name);
		const matchesRarity =
			selectedRarity === null || char.rarity === selectedRarity;
		const matchesSearch = char.name
			.toLowerCase()
			.includes(search.toLowerCase());

		return matchesElement && matchesPath && matchesRarity && matchesSearch;
	});

	return (
		<>
			<StarBackground />
			<main className="relative min-h-screen p-6 text-white">
				<div className="flex flex-wrap items-stretch gap-4 mb-6">
					{/* Search */}
					<input
						type="text"
						placeholder="Search character..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="
							h-14
							flex-1 min-w-[220px]
							bg-white/10
							backdrop-blur-md
							border border-white/20
							text-white
							placeholder:text-gray-300
							px-4 rounded-2xl
							outline-none
							focus:border-cyan-400
						"
					/>

					{/* Rarity Group */}
					<div className="h-14 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 backdrop-blur-md">
						{[4, 5].map((rarity) => {
							const active = selectedRarity === rarity;
							return (
								<button
									key={rarity}
									onClick={() => toggleRarity(rarity)}
									className={`
										h-10 px-4 rounded-xl border
										transition-all font-semibold
										flex items-center justify-center
										${
											active
												? "bg-yellow-400/30 border-yellow-300 scale-105"
												: "bg-white/5 border-white/10 hover:bg-white/10"
										}
									`}
								>
									<span className="text-yellow-300 tracking-wide">
										{"✦".repeat(rarity)}
									</span>
								</button>
							);
						})}
					</div>
					{/* Element Group */}
					<div className="h-14 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 backdrop-blur-md">
						{elements.map((element) => {
							const active = selectedElements.includes(element.name);
							return (
								<button
									key={element.id}
									onClick={() => toggleElement(element.name)}
									className={`
										flex items-center justify-center
										w-10 h-10 rounded-xl border
										transition-all
										${
											active
												? "bg-cyan-400/30 border-cyan-300 scale-105"
												: "bg-white/5 border-white/10 hover:bg-white/10"
										}
									`}
									title={element.name}
								>
									<Image
										src={element.icon}
										alt={element.name}
										width={20}
										height={20}
										className="object-contain"
									/>
								</button>
							);
						})}
					</div>

					{/* Path Group */}
					<div className="h-14 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 backdrop-blur-md">
						{paths.map((path) => {
							const active = selectedPaths.includes(path.name);
							return (
								<button
									key={path.id}
									onClick={() => togglePath(path.name)}
									className={`
										flex items-center justify-center
										w-10 h-10 rounded-xl border
										transition-all
										${
											active
												? "bg-cyan-400/30 border-cyan-300 scale-105"
												: "bg-white/5 border-white/10 hover:bg-white/10"
										}
									`}
									title={path.name}
								>
									<Image
										src={path.icon}
										alt={path.name}
										width={20}
										height={20}
										className="object-contain"
									/>
								</button>
							);
						})}
					</div>

				</div>
				{/* Content */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{filteredCharacters.map((char) => (
						<CharacterCard key={char.id} {...char} />
					))}
				</div>
				{filteredCharacters.length === 0 && (
					<div className="text-center py-12 text-zinc-400">
						No characters found.
					</div>
				)}
			</main>
		</>
	);
}
