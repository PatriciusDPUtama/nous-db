"use client";

import { useEffect, useState } from "react";

import SearchBar from "@/components/SearchBar";
import RarityFilter from "@/components/RarityFilter";
import LoadingTransition from "@/components/LoadingTransition";
import ItemCard from "@/components/ItemCard";

import { Item } from "@/types/item";
import { getStarRailItems } from "@/lib/api/starrail";

export default function ItemsPage() {
	const [search, setSearch] = useState("");
	const [selectedRarity, setSelectedRarity] = useState<number | null>(null);

	const [items, setItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				const itemsData = await getStarRailItems();
				setItems(itemsData);
			} catch (err) {
				setError("Failed to load items");
				console.error(err);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	if (error) return <div className="p-6 text-red-500">{error}</div>;
	if (loading) return <LoadingTransition />;

	function toggleRarity(rarity: number) {
		setSelectedRarity((prev) => (prev === rarity ? null : rarity));
	}

	const filteredItems = items.filter((item) => {
		const matchesRarity =
			selectedRarity === null || item.rarity === selectedRarity;

		const matchesSearch = item.name
			.toLowerCase()
			.includes(search.toLowerCase());

		return matchesRarity && matchesSearch;
	});

	return (
		<main className="min-h-screen text-white bg-[#050508] p-6">
			{/* INVENTORY HEADER */}
			<div className="flex flex-wrap items-stretch gap-4 mb-6">
				<div className="flex items-center gap-3">
					<SearchBar
						placeholder="Search Items..."
						value={search}
						onChange={setSearch}
					/>
				</div>
			</div>

			{/* INVENTORY GRID CONTAINER */}
			<div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
				{/* slot grid feel */}
				<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
					{filteredItems.map((item) => (
						<div
							key={item.id}
							className="aspect-square rounded-xl transition"
						>
							<ItemCard {...item} />
						</div>
					))}
				</div>

				{/* Empty state */}
				{filteredItems.length === 0 && (
					<div className="text-center py-12 text-zinc-400">
						No items in inventory.
					</div>
				)}
			</div>
		</main>
	);
}