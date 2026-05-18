type SearchBarProps = {
	value: string;
	onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
	return (
		<input
			type="text"
			placeholder="Search character..."
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="
				h-14
				flex-1 min-w-[220px]
				bg-white/10
				backdrop-blur-md
				border border-white/20
				text-white
				placeholder:text-gray-300
				px-4 rounded-2xl
				outline-none
				focus:border-cyan-400
			"
		/>
	);
}
