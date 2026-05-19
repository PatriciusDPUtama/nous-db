"use client";

import { useMemo, useState } from "react";
import { CharacterStats } from "@/types/character";

type Props = {
    stats: CharacterStats[];
};

export default function CharacterStatsCard({ stats }: Props) {
    const [level, setLevel] = useState(1);

    const phase = useMemo(() => {
        if (level >= 70) return stats[6];
        if (level >= 60) return stats[5];
        if (level >= 50) return stats[4];
        if (level >= 40) return stats[3];
        if (level >= 30) return stats[2];
        if (level >= 20) return stats[1];

        return stats[0];
    }, [level, stats]);

    const calculateStat = (base: number, step: number) => {
        return Math.round(base + step * (level - 1));
    };

    return (
        <div className="mt-6 max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">
                    Base Stats
                </h2>

                <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-300">
                    Level {level}
                </div>
            </div>

            {/* Slider */}
            <div className="mt-3">
                <input
                    type="range"
                    min={1}
                    max={80}
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}
                    className="w-full accent-white"
                />
            </div>

            {/* Stats */}
            <div className="mt-4 space-y-2">
                {[
                    {
                        label: "HP",
                        value: calculateStat(phase.hp.base, phase.hp.step),
                    },
                    {
                        label: "ATK",
                        value: calculateStat(phase.atk.base, phase.atk.step),
                    },
                    {
                        label: "DEF",
                        value: calculateStat(phase.def.base, phase.def.step),
                    },
                    {
                        label: "SPD",
                        value: phase.spd.base,
                    },
                    {
                        label: "CRIT Rate",
                        value: `${phase.crit_rate.base * 100}%`,
                    },
                    {
                        label: "CRIT DMG",
                        value: `${phase.crit_dmg.base * 100}%`,
                    },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="
							flex items-center justify-between
							rounded-xl border border-white/10
							bg-white/5 px-3 py-2
							backdrop-blur-md
						"
                    >
                        <p className="text-xs text-zinc-400">
                            {stat.label}
                        </p>

                        <p className="text-sm font-semibold text-white">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}