import { JsonRpcProvider } from "@ethersproject/providers";
import { useEffect, useState } from "react";

export function useLatestBlock(provider: JsonRpcProvider) {
    const [blockNumber, setBlockNumber] = useState<number | undefined>(
        undefined
    );
    useEffect(() => {
        if (!provider) return;
        const onBlock = (num: number) => setBlockNumber(num);
        provider.on("block", onBlock);
        return () => {
            provider.off("block", onBlock);
        };
    }, [provider, setBlockNumber]);
    return blockNumber;
}
