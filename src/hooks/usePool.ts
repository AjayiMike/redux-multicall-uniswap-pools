import {
    useMultipleContractSingleData,
    useSingleCallResult,
} from "@/multicall/hooks";
import { Contract } from "@ethersproject/contracts";
import poolAbi from "../abis/pool.json";
import erc20Abi from "../abis/erc20.json";
import { provider } from "@/constants/provider";
import { useMemo } from "react";
import { Interface } from "@ethersproject/abi";
import { formatEther, formatUnits } from "@ethersproject/units";

export const usePool = (address: string | undefined) => {
    const poolContract = useMemo(
        () => (address ? new Contract(address, poolAbi, provider) : null),
        [address]
    );
    const token0Call = useSingleCallResult(poolContract, "token0");
    const token1Call = useSingleCallResult(poolContract, "token1");
    const totalSupplyCall = useSingleCallResult(poolContract, "totalSupply");
    const reservesCall = useSingleCallResult(poolContract, "getReserves");

    const tokensAddresses = useMemo(
        () => [token0Call?.result?.[0], token1Call?.result?.[0]],
        [token0Call?.result, token1Call?.result]
    );
    const ERC20_INTERFACE = new Interface(erc20Abi);

    const tokensNamesCalls = useMultipleContractSingleData(
        tokensAddresses,
        ERC20_INTERFACE,
        "name"
    );
    const tokensSymbolsCalls = useMultipleContractSingleData(
        tokensAddresses,
        ERC20_INTERFACE,
        "symbol"
    );
    const tokensDecimalsCalls = useMultipleContractSingleData(
        tokensAddresses,
        ERC20_INTERFACE,
        "decimals"
    );

    return useMemo(
        () =>
            token0Call.loading ||
            token1Call.loading ||
            totalSupplyCall.loading ||
            reservesCall.loading ||
            tokensNamesCalls.some((call) => call.loading) ||
            tokensSymbolsCalls.some((call) => call.loading) ||
            tokensDecimalsCalls.some((call) => call.loading)
                ? { loading: true, data: null }
                : {
                      loading: false,
                      data: {
                          token0Name: tokensNamesCalls[0].result?.[0],
                          token1Name: tokensNamesCalls[1].result?.[0],
                          token0Symbol: tokensSymbolsCalls[0].result?.[0],
                          token1Symbol: tokensSymbolsCalls[1].result?.[0],
                          token0Decimals: tokensDecimalsCalls[0].result?.[0],
                          token1Decimals: tokensDecimalsCalls[1].result?.[0],
                          reserve0: reservesCall?.result
                              ? formatUnits(
                                    reservesCall?.result?._reserve0,
                                    tokensDecimalsCalls[0].result?.[0]
                                )
                              : 0,
                          reserve1: reservesCall?.result
                              ? formatUnits(
                                    reservesCall?.result?._reserve1,
                                    tokensDecimalsCalls[1].result?.[0]
                                )
                              : 0,
                          totalSupply: totalSupplyCall.result
                              ? formatEther(totalSupplyCall.result?.[0])
                              : 0,
                      },
                  },
        [
            reservesCall.loading,
            reservesCall?.result,
            token0Call.loading,
            token1Call.loading,
            tokensDecimalsCalls,
            tokensNamesCalls,
            tokensSymbolsCalls,
            totalSupplyCall.loading,
            totalSupplyCall.result,
        ]
    );
};
