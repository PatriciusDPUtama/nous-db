"use client";

import { useEffect, useState } from "react";

import LightConeCard from "@/components/LightConeCard";

import SearchBar from "@/components/SearchBar";
import IconFilter from "@/components/IconFilter";
import RarityFilter from "@/components/RarityFilter";
import LoadingTransition from "@/components/LoadingTransition";

import { LightCone } from "@/types/lightcone";
import { Path } from "@/types/path";
import {
    getStarRailPaths,
    getStarRailLightCones,
} from "@/lib/api/starrail";

export default function LightConePage() {
    const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
    const [selectedRarity, setSelectedRarity] = useState<number | null>(null);

    const [search, setSearch] = useState("");
    const [lightcones, setLightCones] = useState<LightCone[]>([]);
    const [paths, setPaths] = useState<Path[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                const [lightconeData, pathsData] = await Promise.all([
                    getStarRailLightCones(),
                    getStarRailPaths(),
                ]);

                setLightCones(lightconeData);
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
        return <LoadingTransition />;
    }

    function togglePath(path: string) {
        setSelectedPaths((prev) =>
            prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path],
        );
    }

    function toggleRarity(rarity: number) {
        setSelectedRarity((prev) => (prev === rarity ? null : rarity));
    }

    const filteredLightcone = lightcones.filter((lc) => {
        const matchesPath =
            selectedPaths.length === 0 || selectedPaths.includes(lc.path.name);
        const matchesRarity =
            selectedRarity === null || lc.rarity === selectedRarity;
        const matchesSearch = lc.name
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesPath && matchesRarity && matchesSearch;
    });

    return (
        <>
            <main className="relative min-h-screen p-6 text-white">
                <div className="flex flex-wrap items-stretch gap-4 mb-6">
                    {/* Search */}
                    <SearchBar placeholder={"Search Light Cones..."} value={search} onChange={setSearch} />

                    {/* Rarity Group */}
                    <div className="h-12 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 backdrop-blur-md">
                        <RarityFilter rarities={[3, 4, 5]} selected={selectedRarity} onSelect={toggleRarity} />
                    </div>

                    {/* Path Group */}
                    <div className="h-12 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 backdrop-blur-md">
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredLightcone.map((lightcone) => (
                        <LightConeCard key={lightcone.id} {...lightcone} />
                    ))}
                </div>
                {filteredLightcone.length === 0 && (
                    <div className="text-center py-12 text-zinc-400">
                        No lightcone found.
                    </div>
                )}
            </main>
        </>
    );
}
