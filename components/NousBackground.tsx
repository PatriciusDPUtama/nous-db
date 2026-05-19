export default function NousBackground() {
	return (
		<div className="fixed inset-0 -z-10 overflow-hidden bg-[#050508]">
			{/* Ambient center field */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,240,0.05),transparent_60%)]" />

			{/* Secondary depth layer */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,90,255,0.04),transparent_55%)]" />
		</div>
	);
}