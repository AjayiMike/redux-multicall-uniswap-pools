import { useSingleContractWithCallData } from "@/multicall/hooks";
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

    const poolContractInterface = new Interface(poolAbi);

    const token0CallData = poolContractInterface.encodeFunctionData("token0");
    const token1CallData = poolContractInterface.encodeFunctionData("token1");
    const totalSupplyCallData =
        poolContractInterface.encodeFunctionData("totalSupply");
    const reservesCallData =
        poolContractInterface.encodeFunctionData("getReserves");

    const poolContractCalls = useSingleContractWithCallData(poolContract, [
        token0CallData,
        token1CallData,
        totalSupplyCallData,
        reservesCallData,
    ]);

    const token0 = useMemo(
        () => poolContractCalls[0]?.result?.[0],
        [poolContractCalls]
    );
    const token1 = useMemo(
        () => poolContractCalls[1]?.result?.[0],
        [poolContractCalls]
    );
    const totalSupply = useMemo(
        () => poolContractCalls[2]?.result?.[0],
        [poolContractCalls]
    );
    const reserves = useMemo(
        () => poolContractCalls[3]?.result,
        [poolContractCalls]
    );

    const ERC20_INTERFACE = new Interface(erc20Abi);
    const nameCallData = ERC20_INTERFACE.encodeFunctionData("name");
    const symbolCallData = ERC20_INTERFACE.encodeFunctionData("symbol");
    const decimalsCallData = ERC20_INTERFACE.encodeFunctionData("decimals");

    const token0Contract = useMemo(
        () => (token0 ? new Contract(token0, erc20Abi, provider) : null),
        [token0]
    );

    const token0InfoCalls = useSingleContractWithCallData(token0Contract, [
        nameCallData,
        symbolCallData,
        decimalsCallData,
    ]);

    const token1Contract = useMemo(
        () => (token1 ? new Contract(token1, erc20Abi, provider) : null),
        [token1]
    );

    const token1InfoCalls = useSingleContractWithCallData(token1Contract, [
        nameCallData,
        symbolCallData,
        decimalsCallData,
    ]);

    const token0Name = useMemo(
        () => token0InfoCalls[0]?.result?.[0],
        [token0InfoCalls]
    );
    const token0Symbol = useMemo(
        () => token0InfoCalls[1]?.result?.[0],
        [token0InfoCalls]
    );
    const token0Decimals = useMemo(
        () => token0InfoCalls[2]?.result?.[0],
        [token0InfoCalls]
    );

    const token1Name = useMemo(
        () => token1InfoCalls[0]?.result?.[0],
        [token1InfoCalls]
    );
    const token1Symbol = useMemo(
        () => token1InfoCalls[1]?.result?.[0],
        [token1InfoCalls]
    );
    const token1Decimals = useMemo(
        () => token1InfoCalls[2]?.result?.[0],
        [token1InfoCalls]
    );

    return useMemo(
        () =>
            poolContractCalls.some((call) => call.loading) ||
            token0InfoCalls.some((call) => call.loading) ||
            token1InfoCalls.some((call) => call.loading)
                ? { loading: true, data: null }
                : {
                      loading: false,
                      data: {
                          token0Name,
                          token1Name,
                          token0Symbol,
                          token1Symbol,
                          token0Decimals,
                          token1Decimals,
                          reserve0: reserves
                              ? formatUnits(reserves?._reserve0, token0Decimals)
                              : 0,
                          reserve1: reserves
                              ? formatUnits(reserves?._reserve1, token1Decimals)
                              : 0,
                          totalSupply: totalSupply
                              ? formatEther(totalSupply)
                              : 0,
                      },
                  },
        [
            poolContractCalls,
            reserves,
            token0Decimals,
            token0InfoCalls,
            token0Name,
            token0Symbol,
            token1Decimals,
            token1InfoCalls,
            token1Name,
            token1Symbol,
            totalSupply,
        ]
    );
};
