"use client";
import styles from "./page.module.scss";
import { useState, useEffect } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
  useConnect,
  useBalance,
  useNetwork,
} from "wagmi";
import {
  getUAappAddr,
  getUAappAbi,
  getUsdcAddress,
} from "../../contracts/contracts";

export default function NewTransection() {
  const [mounted, setMounted] = useState(false);

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
  });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const contractAddr = getUAappAddr(chain?.network as string)?.split("x")[1];
  console.log(contractAddr);

  const { write } = useContractWrite({
    address: `0x${contractAddr}`,
    abi: getUAappAbi(chain?.network as string),
    functionName: "swap",
  });
  if (!mounted) return <div>loading...</div>;
  return (
    <>
      <div suppressHydrationWarning className={styles.main}>
        {isConnected && <div>Connected to {activeConnector?.name}</div>}
        {chain && <div>Connected to {chain.network}</div>}
        {chains && (
          <div className={styles.chains}>
            Available chains:{" "}
            {chains.map((chain) => {
              return <p>{chain.network}</p>;
            })}
          </div>
        )}

        {connectors.map((connector) => (
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
        ))}

        {error && <div>{error.message}</div>}
        <div> {address ? address : "Connect to a wallet"}</div>
        <div>
          {" "}
          {isBalanceLoading
            ? "loading..."
            : `${data?.formatted} ${data?.symbol}`}
        </div>
        <button
          onClick={() => {
            write({
              args: [" ", " ", " "],
            });
          }}
          className={styles.paybtn}
        >
          lol
        </button>
      </div>
    </>
  );
}
