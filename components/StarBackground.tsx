export default function StarBackground() {
	return (
		<div className="fixed inset-0 -z-10 bg-[#00010a] overflow-hidden">
			{/* very dark space depth */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0a0a1a,transparent_55%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#020b14,transparent_60%)]" />

			{/* subtle nebula only */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3b0a5a10,transparent_70%)]" />

			{/* brighter + bigger sparse stars */}
			<div
				className="absolute inset-0 opacity-70"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Ccircle cx='30' cy='40' r='1.6' fill='white'/%3E%3Ccircle cx='120' cy='80' r='1.2' fill='white'/%3E%3Ccircle cx='200' cy='50' r='1.8' fill='white'/%3E%3Ccircle cx='260' cy='180' r='1.3' fill='white'/%3E%3Ccircle cx='80' cy='220' r='1.5' fill='white'/%3E%3Ccircle cx='160' cy='200' r='1.1' fill='white'/%3E%3C/svg%3E")`,
					backgroundSize: "300px 300px",
				}}
			/>

			{/* strong darkness vignette for deep space feel */}
			<div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.92))]" />
		</div>
	);
}
