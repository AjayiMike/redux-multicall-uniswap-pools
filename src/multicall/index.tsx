import { createMulticall } from "@uniswap/redux-multicall";

const multicall = createMulticall({ reducerPath: "multicall" });

export default multicall;
