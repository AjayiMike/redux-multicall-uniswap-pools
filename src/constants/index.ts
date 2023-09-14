const env_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
const env_RPC_URL = process.env.NEXT_PUBLIC_CHAIN_ID;

export const CHAIN_ID = env_CHAIN_ID ? (env_CHAIN_ID as unknown as number) : 1;
export const RPC_URL = env_RPC_URL ?? "https://eth.llamarpc.com";

export const uniswapInterfaceMulticallAddress =
    "0x1F98415757620B543A52E61c46B32eB19261F984";
