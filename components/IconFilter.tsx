import Image from "next/image";

type IconFilterProps<T> = {
	items: T[];
	selected: string[];
	onSelect: (value: string) => void;

	getKey: (item: T) => string | number;
	getValue: (item: T) => string;
	getIcon: (item: T) => string;
	getLabel?: (item: T) => string;
};

export default function IconFilter<T>({
	items,
	selected,
	onSelect,
	getKey,
	getValue,
	getIcon,
	getLabel,
}: IconFilterProps<T>) {
	return (
		<>
			{items.map((item) => {
				const value = getValue(item);
				const active = selected.includes(value);

				return (
					<button
						key={getKey(item)}
						onClick={() => onSelect(value)}
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
						title={getLabel?.(item) ?? value}
					>
						<Image
							src={getIcon(item)}
							alt={value}
							width={20}
							height={20}
							className="object-contain"
						/>
					</button>
				);
			})}
		</>
	);
}