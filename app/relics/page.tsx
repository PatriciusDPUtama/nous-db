"use client";

import { useEffect, useState } from "react";
import RelicSetCard from "@/components/RelicSetCard";
import SearchBar from "@/components/SearchBar";
import LoadingTransition from "@/components/LoadingTransition";

import { RelicSets } from "@/types/relic";
import { getStarRailRelicSets } from "@/lib/api/starrail";

export default function RelicPage() {
	const [search, setSearch] = useState("");

	const [relicSets, setRelicSets] = useState<RelicSets[]>([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);

				const data = await getStarRailRelicSets();

				setRelicSets(data);
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
		return <LoadingTransition />;
	}

	const filteredSets = relicSets.filter((set) => {
		const matchesSearch = set.name.toLowerCase().includes(search.toLowerCase());

		return matchesSearch;
	});

	return (
		<main className="relative min-h-screen p-6 text-white">
			<div className="flex flex-wrap items-stretch gap-4 mb-6">
				<SearchBar
					placeholder="Search Relic Sets..."
					value={search}
					onChange={setSearch}
				/>
			</div>

			<div className="grid grid-cols-2 gap-6">
				{filteredSets.map((set) => (
					<RelicSetCard key={set.id} relicSet={set} />
				))}
			</div>

			{filteredSets.length === 0 && (
				<div className="text-center py-12 text-zinc-400">
					No relic set found.
				</div>
			)}
		</main>
	);
}
