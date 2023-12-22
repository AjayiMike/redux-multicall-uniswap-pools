import { usePool } from "@/hooks/usePool";
import { useRouter } from "next/router";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Pool = () => {
    const router = useRouter();
    const { address } = router.query;

    const { loading, data } = usePool(address as string | undefined);
    const {
        reserve0,
        reserve1,
        token0Symbol,
        token1Symbol,
        token0Name,
        token1Name,
        totalSupply,
    } = data || {};

    return (
        <main className={`min-h-screen p-24 ${inter.className}`}>
            <div className="flex flex-col gap-2 mb-6">
                <span className="font-bold text-xl">Address: </span>
                <span>{loading ? "loading..." : address}</span>
            </div>
            <div className="flex flex-col gap-2 mb-6">
                <span className="font-bold text-xl">Token0: </span>
                <span>{loading ? "loading..." : token0Name}</span>
            </div>
            <div className="flex flex-col gap-2 mb-6">
                <span className="font-bold text-xl">Token1: </span>
                <span>{loading ? "loading..." : token1Name}</span>
            </div>
            <div className="flex flex-col gap-2 mb-6">
                <span className="font-bold text-xl">Reserve0: </span>
                <span>
                    {loading ? "loading..." : `${reserve0} ${token0Symbol}`}
                </span>
            </div>
            <div className="flex flex-col gap-2 mb-6">
                <span className="font-bold text-xl">Reserve1: </span>
                <span>
                    {loading ? "loading..." : `${reserve1} ${token1Symbol}`}
                </span>
            </div>
            <div className="flex flex-col gap-2 mb-6">
                <span className="font-bold text-xl">Total Supply: </span>
                <span>{loading ? "loading..." : totalSupply}</span>
            </div>
        </main>
    );
};

export default Pool;
