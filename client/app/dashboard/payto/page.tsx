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
  getDstChainID,
} from "../../contracts/contracts";

export default function NewTransection() {
  const [mounted, setMounted] = useState(false);
  const [tokenQty, setTokenQty] = useState(10);
  const [recipient, setRecipient] = useState("0x00000");
  const [dstChain, setDstChain] = useState("avalanche-fuji");
  const [dstChainId, setDstChainId] = useState(getDstChainID(dstChain));
  const [dstUAappAddr, setDstUAappAddr] = useState(
    getUAappAddr(dstChain) as string
  );

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
    onSuccess(txHash) {
      console.log("success", txHash);
    },
  });
  // const {
  //   data: stargateRouterAddr,
  //   isError: stargateRouterError,
  //   isLoading: stargateRouterLoading,
  // } = useContractRead({
  //   address: `0x${contractAddr}`,
  //   abi: getUAappAbi(chain?.network as string),
  //   functionName: "stargateRouter",
  // });

  //usdc approve
  const { write: usdcApprove } = useContractWrite({
    address: getUsdcAddress(chain?.network as string),
    abi: erc20ABI,
    functionName: "approve",
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
        {/* {chain && <div>Connected to {chain.network}</div>}
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

        <button
          onClick={() => {
            sendToken();
          }}
          className={styles.paybtn}
        >
          send {tokenQty} USDC to {recipient}
        </button>

        <div className={styles.heading}>New-Transaction</div>
        <div>
          <div className={styles.a}>
            <div className={styles.b}>chains</div>
          </div>
          <hr />
        </div> */}

        <div className={styles.Transection}>
          <div className={styles.container}>
            <div className={styles.searchcontainer}>
              <input className={styles.input} type="text" />
              <svg viewBox="0 0 24 24" className={styles.searchicon}>
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
            </div>
          </div>
          <div className={styles.cardcontainer}>
            <div className={styles.container1}>
              <div className={styles.searchcontainer}>
                <div className={styles.carddiv}>
                  <div className={styles.content1}>
                    <div style={{ fontWeight: "bolder", marginTop: "100px" }}>
                      {address ? address : "Connect to a wallet"}
                    </div>
                    <div>
                      {connectors.map((connector) => {
                        if (address && connector.id === activeConnector?.id)
                          return null;
                        return (
                          <button
                            style={{ padding: "12px" }}
                            className={styles.connect}
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
                    </div>
                    <div>
                      <span style={{ color: "black", marginTop: "10px" }}>
                        {chain && <div>Connected to | {chain.network}</div>}
                      </span>
                    </div>
                    <div>
                      {" "}
                      {isBalanceLoading
                        ? "loading..."
                        : `$${data?.formatted} ${data?.symbol}`}
                    </div>
                    <div>
                      <div>
                        <span>enter address </span>
                        <div>
                          <input className={styles.input1} />
                        </div>{" "}
                        StargateAddr:{" "}
                        <span
                          style={{
                            color: "black",
                            textAlign: "center",
                            marginTop: "10px",
                          }}
                        >
                          {stargateRouterLoading
                            ? "loading..."
                            : `${stargateRouterAddr}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.content2}>
                    <div className={styles.data}>
                      <div>
                        <div className={styles.inputs}>
                          <div>
                            <div>
                              select your network
                              <br />
                              👇
                              <form>
                                <select
                                  style={{
                                    padding: "10px 0px 10px 0px",
                                    backgroundColor: "white",
                                    color: "black",
                                    borderRadius: "5px",
                                    fontSize: "18px",
                                  }}
                                  className=""
                                  name="languages"
                                  id="lang"
                                >
                                  <option
                                    style={{ padding: "10px 0px 10px 0px" }}
                                    className=""
                                    value="fuji"
                                  >
                                    fuji
                                  </option>
                                  <option
                                    style={{ padding: "10px 0px 10px 0px" }}
                                    className=""
                                    value="mumbai"
                                  >
                                    mumbai
                                  </option>
                                  <option
                                    style={{ padding: "10px 0px 10px 0px" }}
                                    className=""
                                    value="goarli"
                                  >
                                    goarli
                                  </option>
                                  <option
                                    style={{ padding: "10px 0px 10px 0px" }}
                                    className=""
                                    value="optimisum gorali"
                                  >
                                    optimisum gorali
                                  </option>
                                </select>
                              </form>
                            </div>
                          </div>
                          <div>
                            <span>enter amount </span>
                            <div>
                              <input className={styles.input1} />
                            </div>
                            <button
                              style={{ padding: "20px" }}
                              className={styles.button2}
                              onClick={() => {
                                sendToken();
                              }}
                            >
                              send {tokenQty} USDC to {recipient.substr(0, 10)}
                              ......
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
