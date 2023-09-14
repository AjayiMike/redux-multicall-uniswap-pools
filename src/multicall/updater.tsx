import type { ListenerOptions } from "@uniswap/redux-multicall";
import multicallABI from "../abis/uniswapInterfaceMulticall.json";
import { provider } from "../constants/provider";
import { useLatestBlock } from "../hooks/useLatestBlock";
import { Contract } from "@ethersproject/contracts";
import multicall from ".";
import { uniswapInterfaceMulticallAddress } from "@/constants";

const MulticallUpdater = () => {
    const blockNumber = useLatestBlock(provider);

    const listenerOptions: ListenerOptions = {
        blocksPerFetch: 1,
    };

    const uniswapMulticall = new Contract(
        uniswapInterfaceMulticallAddress,
        multicallABI,
        provider
    );

    return (
        <multicall.Updater
            chainId={1}
            latestBlockNumber={blockNumber}
            contract={uniswapMulticall}
            listenerOptions={listenerOptions}
        />
    );
};

export default MulticallUpdater;
