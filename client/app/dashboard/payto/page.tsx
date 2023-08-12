"use client";
import styles from "./page.module.scss";
import { useContractWrite, useAccount, useConnect } from "wagmi";
import { contracts } from "../../contracts/contracts";

export default function NewTransection() {
  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  // const {write}= useContractWrite({
  //   contract: '',
  //   // abi: {},
  //   method: '',
  // })

  return (
    <>
      <div className={styles.main}>
        {isConnected && <div>Connected to {activeConnector?.name}</div>}

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
        <button className={styles.paybtn}>lol</button>
      </div>
    </>
  );
}
