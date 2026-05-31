"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const linkClass = (active: boolean) => `
		group relative overflow-hidden
		rounded-xl
		border border-white/10
		bg-[#111827]
		px-4 py-3
		transition-all duration-200
		hover:bg-[#1a2235]
		hover:border-white/20
	`;

    return (
        <aside
            className="
				fixed top-0 left-0 z-50
				w-60 h-screen
				overflow-hidden
				border-r border-zinc-800
				bg-[#0b0f1a]
				text-white
			"
        >

            <div className="relative z-10 flex h-full flex-col p-4">
                {/* Logo */}
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-[#111827]">
                        <Image
                            src="/logo.png"
                            alt="home"
                            width={28}
                            height={28}
                            className="block object-contain"
                        />
                    </div>

                    <div>
                        <h1 className="text-xl font-black">NOUS DB</h1>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-200/60">
                            Archive
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    <Link href="/" className={linkClass(isActive("/"))}>
                        <div
                            className={`
								absolute inset-y-0 left-0 w-[2px]
								bg-cyan-300
								transition-all
								${isActive("/") ? "opacity-100" : "opacity-0 group-hover:opacity-30"}
							`}
                        />

                        <div className="flex items-center gap-2">
                            <Image
                                src={`${BASE_URL}/icon/sign/AllIcon.png`}
                                alt="home"
                                width={18}
                                height={18}
                            />
                            <p className="text-sm font-semibold">Home</p>
                        </div>
                    </Link>

                    <Link href="/characters" className={linkClass(isActive("/characters"))}>
                        <div
                            className={`
								absolute inset-y-0 left-0 w-[2px]
								bg-cyan-300
								transition-all
								${isActive("/characters") ? "opacity-100" : "opacity-0 group-hover:opacity-30"}
							`}
                        />

                        <div className="flex items-center gap-2">
                            <Image
                                src={`${BASE_URL}/icon/sign/AvatarIcon.png`}
                                alt="characters"
                                width={18}
                                height={18}
                            />
                            <p className="text-sm font-semibold">Characters</p>
                        </div>
                    </Link>

                    <Link href="/lightcones" className={linkClass(isActive("/lightcones"))}>
                        <div
                            className={`
								absolute inset-y-0 left-0 w-[2px]
								bg-cyan-300
								transition-all
								${isActive("/lightcones") ? "opacity-100" : "opacity-0 group-hover:opacity-30"}
							`}
                        />

                        <div className="flex items-center gap-2">
                            <Image
                                src={`${BASE_URL}/icon/sign/ShopLightConIcon.png`}
                                alt="lightcones"
                                width={18}
                                height={18}
                            />
                            <p className="text-sm font-semibold">Light Cones</p>
                        </div>
                    </Link>

                    <Link href="/relics" className={linkClass(isActive("/relics"))}>
                        <div
                            className={`
								absolute inset-y-0 left-0 w-[2px]
								bg-cyan-300
								transition-all
								${isActive("/relics") ? "opacity-100" : "opacity-0 group-hover:opacity-30"}
							`}
                        />

                        <div className="flex items-center gap-2">
                            <Image
                                src={`${BASE_URL}/icon/sign/CocoonIcon.png`}
                                alt="lightcones"
                                width={18}
                                height={18}
                            />
                            <p className="text-sm font-semibold">Relics</p>
                        </div>
                    </Link>

                    <Link href="/items" className={linkClass(isActive("/items"))}>
                        <div
                            className={`
								absolute inset-y-0 left-0 w-[2px]
								bg-cyan-300
								transition-all
								${isActive("/items") ? "opacity-100" : "opacity-0 group-hover:opacity-30"}
							`}
                        />

                        <div className="flex items-center gap-2">
                            <Image
                                src={`${BASE_URL}/icon/sign/InventoryIcon.png`}
                                alt="items"
                                width={18}
                                height={18}
                            />
                            <p className="text-sm font-semibold">Items</p>
                        </div>
                    </Link>
                </nav>
            </div>
        </aside>
    );
}