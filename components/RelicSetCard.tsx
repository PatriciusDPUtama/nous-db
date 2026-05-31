"use client";

import Image from "next/image";
import { RelicSets } from "@/types/relic";

type Props = {
	relicSet: RelicSets;
};

export default function RelicSetCard({ relicSet }: Props) {
	return (
		<div
			className="
				h-full
				p-4
				rounded-2xl
				border border-white/10
				bg-white/5
				backdrop-blur-md
				transition-colors
				hover:bg-white/10
			"
		>
			<div className="flex gap-4">
				<div className="relative shrink-0">
					<Image
						src={relicSet.icon}
						alt={relicSet.name}
						width={64}
						height={64}
						className="object-contain"
					/>
				</div>

				<div className="flex-1 min-w-0">
					<h3 className="font-bold text-lg text-white">
						{relicSet.name}
					</h3>

					<div className="mt-3 space-y-3">
						{relicSet.desc[0] && (
							<div>
								<div className="text-xs font-semibold text-amber-400 uppercase tracking-wide ">
									2-Piece Effect
								</div>

								<p className="mt-1 text-sm text-zinc-300">
									{relicSet.desc[0]}
								</p>
							</div>
						)}

						{relicSet.desc[1] && (
							<div className="mt-3">
								<div className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
									4-Piece Effect
								</div>

								<p className="mt-1 text-sm text-zinc-300">
									{relicSet.desc[1]}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}