"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import CharacterCard from "@/components/CharacterCard";
import StarBackground from "@/components/StarBackground";
import SearchBar from "@/components/SearchBar";
import IconFilter from "@/components/IconFilter";
import RarityFilter from "@/components/RarityFilter";

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
					<SearchBar value={search} onChange={setSearch} />

					{/* Rarity Group */}
					<div className="h-14 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 backdrop-blur-md">
						<RarityFilter rarities={[4,5]} selected={selectedRarity} onSelect={toggleRarity} />
					</div>

					{/* Element Group */}
					<div className="h-14 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 backdrop-blur-md">
						<IconFilter
							items={elements}
							selected={selectedElements}
							onSelect={toggleElement}
							getKey={(e) => e.id}
							getValue={(e) => e.name}
							getIcon={(e) => String(e.icon)}
						/>
					</div>
					
					{/* Path Group */}
					<div className="h-14 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 backdrop-blur-md">
						<IconFilter
							items={paths}
							selected={selectedPaths}
							onSelect={togglePath}
							getKey={(p) => p.id}
							getValue={(p) => p.name}
							getIcon={(p) => String(p.icon)}
						/>
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
