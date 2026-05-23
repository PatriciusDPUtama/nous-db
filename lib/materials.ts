export function getMaterialsForLevel(promotions: any[][], level: number) {
	const total: Record<string, number> = {};
	let maxPhase = 0;

	if (level >= 20) maxPhase = 1;
	if (level >= 30) maxPhase = 2;
	if (level >= 40) maxPhase = 3;
	if (level >= 50) maxPhase = 4;
	if (level >= 60) maxPhase = 5;
	if (level >= 70) maxPhase = 6;

	for (let i = 0; i < maxPhase; i++) {
		const phaseMaterials = promotions[i];

		for (const material of phaseMaterials) {
			total[material.id] = (total[material.id] || 0) + material.num;
		}
	}

	return total;
}
