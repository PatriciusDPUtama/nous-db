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
						title={getLabel?.(item) ?? value}
						className={`
							flex items-center justify-center
							w-10 h-10 rounded-xl border
							transition-all duration-200
							transform-gpu

							${active
								? "bg-cyan-400/20 border-cyan-300/60 scale-110 shadow-[0_0_12px_rgba(0,255,240,0.15)]"
								: "bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-400/30 hover:scale-105"
							}
						`}
					>
						{/* subtle scan overlay */}
						<div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent" />

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