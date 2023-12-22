import { provider } from "@/constants/provider";
import { Contract } from "@ethersproject/contracts";
import V2factoryAbi from "../abis/uniswapV2FactoryAbi.json";
import { useSingleContractMultipleData } from "@/multicall/hooks";
import { uniswapV2FactoryAddress } from "@/constants";
import { useMemo } from "react";

export const usePools = (): { loaded: boolean; poolAddresses: string[] } => {
    const V2FactoryContract = new Contract(
        uniswapV2FactoryAddress,
        V2factoryAbi,
        provider
    );

    const poolsIndexArray = Array.from({ length: 1000 }, (_, index) => [index]);

    const poolsCall = useSingleContractMultipleData(
        V2FactoryContract,
        "allPairs",
        poolsIndexArray
    );

    const loaded = useMemo(
        () => poolsCall.every((call) => !call?.loading),
        [poolsCall]
    );

    const poolAddresses = useMemo(
        () => poolsCall.map((call) => call?.result?.[0]),
        [poolsCall]
    );
    return { loaded, poolAddresses: loaded ? poolAddresses : [] };
};
