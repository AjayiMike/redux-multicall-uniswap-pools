import { useLatestBlock } from "@/hooks/useLatestBlock";
import multicall from ".";
import { provider } from "@/constants/provider";

type TupleSplit<
    T,
    N extends number,
    O extends readonly any[] = readonly []
> = O["length"] extends N
    ? [O, T]
    : T extends readonly [infer F, ...infer R]
    ? TupleSplit<readonly [...R], N, readonly [...O, F]>
    : [O, T];

export type SkipFirst<T extends readonly any[], N extends number> = TupleSplit<
    T,
    N
>[1];

type SkipFirstTwoParams<T extends (...args: any) => any> = SkipFirst<
    Parameters<T>,
    2
>;

export function useMultipleContractSingleData(
    ...args: SkipFirstTwoParams<
        typeof multicall.hooks.useMultipleContractSingleData
    >
) {
    const latestBlock = useLatestBlock(provider);
    return multicall.hooks.useMultipleContractSingleData(
        1,
        latestBlock,
        ...args
    );
}

export function useSingleCallResult(
    ...args: SkipFirstTwoParams<typeof multicall.hooks.useSingleCallResult>
) {
    const latestBlock = useLatestBlock(provider);

    return multicall.hooks.useSingleCallResult(1, latestBlock, ...args);
}

export function useSingleContractMultipleData(
    ...args: SkipFirstTwoParams<
        typeof multicall.hooks.useSingleContractMultipleData
    >
) {
    const latestBlock = useLatestBlock(provider);
    return multicall.hooks.useSingleContractMultipleData(
        1,
        latestBlock,
        ...args
    );
}

export function useSingleContractWithCallData(
    ...args: SkipFirstTwoParams<
        typeof multicall.hooks.useSingleContractWithCallData
    >
) {
    const latestBlock = useLatestBlock(provider);
    return multicall.hooks.useSingleContractWithCallData(
        1,
        latestBlock,
        ...args
    );
}
