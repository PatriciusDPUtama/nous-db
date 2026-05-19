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
            {/* background grid */}
            <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:100%_36px]" />

            <div className="relative z-10 flex h-full flex-col p-4">
                {/* Logo */}
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-[#111827] text-lg">
                        ✨
                    </div>

                    <div>
                        <h1 className="text-xl font-black">HSR DB</h1>
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
                                src={`${BASE_URL}/icon/sign/TeamIcon.png`}
                                alt="characters"
                                width={18}
                                height={18}
                            />
                            <p className="text-sm font-semibold">Characters</p>
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

                {/* Bottom */}
                <div className="mt-auto">
                    <div className="rounded-2xl border border-white/10 bg-[#111827] p-4">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-200/60">
                            Database
                        </p>
                        <h2 className="mt-1 text-base font-bold">
                            Honkai Star Rail
                        </h2>
                        <p className="mt-2 text-xs text-zinc-400">
                            Characters, elements, paths, relics.
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}