import { usePools } from "@/hooks/usePools";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const { loaded, poolAddresses } = usePools();

    return (
        <main className={`min-h-screen p-24 ${inter.className}`}>
            <h1 className="text-2xl font-bold">Uniswap V2 Pools</h1>
            <div className="mt-4">
                {loaded ? (
                    poolAddresses.map((pool, index) => (
                        <div className="py-1" key={index}>
                            <Link
                                className="hover:text-blue-500"
                                href={`/pool/${pool}`}
                            >
                                {pool}
                            </Link>
                        </div>
                    ))
                ) : (
                    <div>
                        <span>loading...</span>
                    </div>
                )}
            </div>
        </main>
    );
}
