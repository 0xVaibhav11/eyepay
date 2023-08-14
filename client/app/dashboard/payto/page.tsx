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
  const [tokenQty, setTokenQty] = useState<number>(10);
  const [dstChainId, setDstChainId] = useState<number>(10106);

  const [recipient, setRecipient] = useState("...");
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

  // send token to reciver
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRecipient(e.currentTarget.value);
  }
  function handleToken(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);

    setTokenQty(value);
  }
  function chainHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = parseInt(e.target.value);

    setDstChainId(value);
  }

  useEffect(() => {
    console.log(dstChainId);
  }, [dstChainId]);

  if (!mounted) return <div>loading...</div>;
  return (
    <>
      <div suppressHydrationWarning className={styles.main}>
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
                        <div className={styles.addr}>
                          <span style={{ paddingTop: "10px" }}>
                            enter address{" "}
                          </span>
                          <div>
                            <input
                              className={styles.input1}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.content2}>
                    <div className={styles.data}>
                      <div>
                        <div className={styles.inputs}>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <span style={{ paddingBottom: "50px" }}>
                              Select dst chain 🤜
                            </span>
                            <form>
                              <select
                                onChange={(data) => {
                                  chainHandler(data);
                                }}
                                style={{
                                  padding: "10px 0px 10px 0px",
                                  backgroundColor: "white",
                                  color: "black",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "20rem",
                                  borderRadius: "5px",
                                  fontSize: "18px",
                                  borderColor: "#818cf8",
                                }}
                                className=""
                                name="languages"
                                id="lang"
                              >
                                <option
                                  style={{ padding: "10px 0px 10px 0px" }}
                                  className=""
                                  value="10106"
                                >
                                  fuji
                                </option>
                                <option
                                  style={{ padding: "10px 0px 10px 0px" }}
                                  className=""
                                  value="10121"
                                >
                                  goerli
                                </option>
                                <option
                                  style={{ padding: "10px 0px 10px 0px" }}
                                  className=""
                                  value="10109"
                                >
                                  mumbai
                                </option>
                                <option
                                  style={{ padding: "10px 0px 10px 0px" }}
                                  className=""
                                  value="10132"
                                >
                                  optimisum gorali
                                </option>
                              </select>
                            </form>
                          </div>

                          <div>
                            <div className={styles.input2}>
                              <span>enter amount </span>
                              <div>
                                <input
                                  className={styles.input1}
                                  type="number"
                                  value={tokenQty}
                                  onChange={handleToken}
                                />
                              </div>
                            </div>
                            <button
                              style={{ padding: "20px" }}
                              className={styles.button2}
                              onClick={() => {
                                sendToken();
                              }}
                            >
                              send {tokenQty} USDC to {recipient}
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
