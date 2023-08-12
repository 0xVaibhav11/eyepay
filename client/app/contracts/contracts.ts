import fuji from "./fuji/StargateSwap.json";
import goerli from "./goerli/StargateSwap.json";
import mumbai from "./mumbai/StargateSwap.json";
import optimismGoerli from "./optimism-goerli/StargateSwap.json";

export const contracts = {
  fuji,
  goerli,
  mumbai,
  optimismGoerli,
};
export function getUAappAddr(network: string) {
  if (network === "avalanche-fuji") {
    return contracts.fuji.address;
  }
  if (network === "goerli") {
    return contracts.goerli.address;
  }
  if (network === "maticmum") {
    return contracts.mumbai.address;
  }
  if (network === "optimism-goerli") {
    return contracts.optimismGoerli.address;
  }
}
export function getUAappAbi(network: string) {
  if (network === "avalanche-fuji") {
    return contracts.fuji.abi;
  }
  if (network === "goerli") {
    return contracts.goerli.abi;
  }
  if (network === "maticmum") {
    return contracts.mumbai.abi;
  }
  if (network === "optimism-goerli") {
    return contracts.optimismGoerli.abi;
  }
}
export function getUsdcAddress(network: string) {
  if (network === "avalanche-fuji") {
    return "0x4A0D1092E9df255cf95D72834Ea9255132782318";
  }
  if (network === "goerli") {
    return "0xDf0360Ad8C5ccf25095Aa97ee5F2785c8d848620";
  }
  if (network === "maticmum") {
    return "0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7";
  }
  if (network === "optimism-goerli") {
    return "0x0CEDBAF2D0bFF895C861c5422544090EEdC653Bf";
  }
}
