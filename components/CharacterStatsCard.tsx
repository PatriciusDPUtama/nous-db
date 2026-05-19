"use client";

import { useMemo, useState } from "react";
import { CharacterStats } from "@/types/character";

type Props = {
    stats: CharacterStats[];
};

export default function CharacterStatsCard({
    stats,
}: Props) {
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

    const calculateStat = (
        base: number,
        step: number,
    ) => {
        return Math.round(
            base + step * (level - 1),
        );
    };

    return (
        <div className="mt-10 max-w-xl">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                    Stats
                </h2>

                <div
                    className="
						rounded-xl border border-white/10
						bg-white/5 px-3 py-1
						text-sm text-zinc-300
					"
                >
                    Level {level}
                </div>
            </div>

            <div className="mt-4">
                <input
                    type="range"
                    min={1}
                    max={80}
                    value={level}
                    onChange={(e) =>
                        setLevel(Number(e.target.value))
                    }
                    className="w-full accent-white"
                />
            </div>

            <div className="mt-6 space-y-3">
                {[
                    {
                        label: "HP",
                        value: calculateStat(
                            phase.hp.base,
                            phase.hp.step,
                        ),
                    },
                    {
                        label: "ATK",
                        value: calculateStat(
                            phase.atk.base,
                            phase.atk.step,
                        ),
                    },
                    {
                        label: "DEF",
                        value: calculateStat(
                            phase.def.base,
                            phase.def.step,
                        ),
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
							rounded-2xl border border-white/10
							bg-white/5 px-4 py-3
							backdrop-blur-md
						"
                    >
                        <p className="text-sm text-zinc-400">
                            {stat.label}
                        </p>

                        <p className="text-lg font-bold">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}