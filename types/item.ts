export type Item = {
	id: string;
	name: string;
    type : string;
	sub_type : string;
    rarity : number;
    come_from: string[];
	icon: string;
};

const rarityStyles: Record<number, string> = {
	1: "border-gray-500/40 bg-gray-500/10",
	2: "border-green-500/40 bg-green-500/10",
	3: "border-blue-500/40 bg-blue-500/10",
	4: "border-purple-500/40 bg-purple-500/10",
	5: "border-yellow-400/50 bg-yellow-400/10 shadow-yellow-400/20",
};
