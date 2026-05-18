type RarityFilterProps<T> = {
	items: T[];
	selected: string;
	onSelect: (value: string) => void;
};

export default function RarityFilter<T>({
	rarities,
	selected,
	onSelect,
} : RarityFilterProps<T>){
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
		</>
	);
}