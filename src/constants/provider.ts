import { JsonRpcProvider } from "@ethersproject/providers";
import { RPC_URL } from ".";

export const provider = new JsonRpcProvider(RPC_URL);
