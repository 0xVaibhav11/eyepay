"use client";
import styles from "./page.module.scss";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  useContractWrite,
  useContractRead,
  useAccount,
  useConnect,
  useBalance,
  useNetwork,
  erc20ABI,
} from "wagmi";
import {
  getUAappAddr,
  getUAappAbi,
  getUsdcAddress,
} from "../../contracts/contracts";

export default function NewTransection() {
  const [mounted, setMounted] = useState(false);
  const [tokenQty, setTokenQty] = useState(10);
  const [dstChainId, setDstChainId] = useState(10106);
  const [recipient, setRecipient] = useState(
    "0x3C9eAA58eC0Eb82D138FcE5ee1C649aD4B48a809"
  );
  const [dstUAappAddr, setDstUAappAddr] = useState(
    "0x2Db09b54E67824f295A6885Ceb735ca0785F7F32"
  );
  const [fees, setFees] = useState(ethers.parseEther("0.025"));

  useEffect(() => {
    setMounted(true);
  }, []);
  const { connector: activeConnector, isConnected, address } = useAccount();

  const { chain, chains } = useNetwork();
  const {
    data,
    isError,
    isLoading: isBalanceLoading,
  } = useBalance({
    address: address,
    token: getUsdcAddress(chain?.network as string),
    watch: true,
  });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const contractAddr = getUAappAddr(chain?.network as string)?.split("x")[1];

  const { write } = useContractWrite({
    address: `0x${contractAddr}`,
    abi: getUAappAbi(chain?.network as string),
    functionName: "swap",
    onSuccess(data) {
      console.log("success", data);
    },
  });
  const {
    data: stargateRouterAddr,
    isError: stargateRouterError,
    isLoading: stargateRouterLoading,
  } = useContractRead({
    address: `0x${contractAddr}`,
    abi: getUAappAbi(chain?.network as string),
    functionName: "stargateRouter",
  });

  //usdc approve
  const { write: usdcApprove } = useContractWrite({
    address: getUsdcAddress(chain?.network as string),
    abi: erc20ABI,
    functionName: "approve",
  });
  const { data: usdcAllowance } = useContractRead({
    address: getUsdcAddress(chain?.network as string),
    abi: erc20ABI,
    functionName: "allowance",
    args: [`0x${address?.split("x")[1]}`, `0x${contractAddr}`],
  });

  async function sendToken() {
    try {
      usdcApprove({
        args: [`0x${contractAddr}`, ethers.MaxUint256],
      });
    } catch (e) {
      console.log(e);
    } finally {
      write({
        args: [
          tokenQty * 1000000,
          getUsdcAddress(chain?.network as string), // the address of the native ERC20 to swap()
          dstChainId, // Stargate/LayerZero chainId
          1, // stargate poolId - *must* be the poolId for the qty asset
          1, // stargate destination poolId
          recipient, // the address to send the destination tokens to
          dstUAappAddr, // destination contract. it must implement sgReceive()
        ],
        value: ethers.parseEther("0.025"),
      });
    }
  }

  if (!mounted) return <div>loading...</div>;
  return (
    <>
      <div suppressHydrationWarning className={styles.main}>
        {chain && <div>Connected to {chain.network}</div>}
        <div>
          {" "}
          {isBalanceLoading
            ? "loading..."
            : `$${data?.formatted} ${data?.symbol}`}
        </div>
        {connectors.map((connector) => {
          if (address && connector.id === activeConnector?.id) return null;
          return (
            <button
              className={styles.paybtn}
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {isLoading &&
                pendingConnector?.id === connector.id &&
                " (connecting)"}
            </button>
          );
        })}
        {error && <div>{error.message}</div>}
        <div> {address ? address : "Connect to a wallet"}</div>
        <div>
          {" "}
          StargateAddr:{" "}
          {stargateRouterLoading ? "loading..." : `${stargateRouterAddr}`}
        </div>

        <button
          onClick={() => {
            sendToken();
          }}
          className={styles.paybtn}
        >
          send {tokenQty} USDC to {recipient}
        </button>
      </div>
    </>
  );
}
