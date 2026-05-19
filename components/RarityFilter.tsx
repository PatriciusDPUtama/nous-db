type RarityFilterProps = {
	rarities: number[];
	selected: number | null;
	onSelect: (value: number) => void;
};

export default function RarityFilter({
	rarities,
	selected,
	onSelect,
}: RarityFilterProps) {
	return (
		<>
			{rarities.map((rarity) => {
				const active = selected === rarity;

				return (
					<button
						key={rarity}
						onClick={() => onSelect(rarity)}
						className={`
							h-10 px-4 rounded-xl border
							transition-all duration-200
							flex items-center justify-center
							font-semibold transform-gpu

							${active
								? "bg-yellow-400/20 border-yellow-300/60 scale-110 shadow-[0_0_12px_rgba(255,200,0,0.15)]"
								: "bg-white/5 border-white/10 hover:bg-white/10 hover:border-yellow-300/30 hover:scale-105"
							}
						`}
					>
						<span className="text-yellow-200 tracking-widest">
							{"✦".repeat(rarity)}
						</span>
					</button>
				);
			})}
		</>
	);
}