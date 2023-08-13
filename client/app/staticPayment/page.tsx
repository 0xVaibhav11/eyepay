"use client";
import styles from "./page.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import axios from "axios";
import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import styled from "./worldcoin.module.scss";
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
} from "../contracts/contracts";

export default function NewTransection() {
  const [userData, setUserData] = useState({} as any);
  const [nameId, setnameID] = useState("");
  let onSuccess = (data: any) => {
    console.log("onSuccess", data);
  };
  const [userID, setUserID] = useState("");
  const [verified, setVerified] = useState(true);
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
  const getTimestamp = (): number => {
    return Date.now();
  };
  const now: number = getTimestamp();
  const actionid = now.toString();
  console.log(actionid);

  const action = async function checkuser() {
    try {
      const res = await axios.get(`http://localhost:8081/api/user/${nameId}`);
      console.log(res.data);
      if (res.data.status === "success") {
        console.log(res.data.data);
      } else {
        alert("User not found");
      }
    } catch (e) {
      console.log(e);
    }
  };
  type reqBody = {
    merkle_root: string;
    nullifier_hash: string;
    proof: string;
    credential_type: string;
    action: string; // or get this from environment variables,
    signal: string; // if we don't have a signal, use the empty string
  };
  if (!mounted) return <div>loading...</div>;
  return (
    <>
      {verified ? (
        <div suppressHydrationWarning className={styles.main}>
          <div className={styles.Transection}>
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
                                send {tokenQty} USDC to{" "}
                                {recipient.substr(0, 10)}
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
      ) : (
        <div className={styled.card1}>
          <div className={styled.card}>
            <div className={styled.card2}>
              <form className={styled.form}>
                <p id={styled.heading}>You are not a bot</p>
                <div className={styled.field}>
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    height={16}
                    width={16}
                    xmlns="http://www.w3.org/2000/svg"
                    className="input-icon"
                  >
                    <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                  </svg>
                  <input
                    type="text"
                    className={styled.inputfield}
                    onChange={(e) => {
                      setnameID(e.target.value);
                    }}
                    placeholder="RealID"
                    autoComplete="off"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <IDKitWidget
                    app_id="app_staging_9cd4757eabeba0a355dd24c771aa78be" // obtained from the Developer Portal
                    action="logins"
                    signal="fsfv"
                    onSuccess={
                      (onSuccess = (result: ISuccessResult) => {
                        console.log(result);
                        if (result.merkle_root === userData.ownerNull) {
                          setVerified(true);
                        } else {
                          alert("you are not the owner of this account");
                        }

                        // This is where you should perform frontend actions once a user has been verified
                      })
                    }
                    // handleVerify={handleVerify} // callback when the modal is closed
                    // optional callback when the proof is received
                    // credential_types={["orb", "phone"]} // optional, defaults to ['orb']
                    enableTelemetry // optional, defaults to falseoisjfojsxojs  d
                  >
                    {({ open }: { open: any }) => (
                      <button
                        type="button"
                        className={styled.button1}
                        onClick={async () => {
                          try {
                            const res = await axios.get(
                              `http://localhost:8081/nft/${nameId}`
                            );
                            setUserData(res.data[0]);
                            if (res.data.length > 0) {
                              console.log(userData);
                              open();
                            } else {
                              alert("User not found");
                            }
                          } catch (e) {
                            console.log(e);
                          }

                          setUserID("test");
                        }}
                      >
                        handleVerify
                      </button>
                    )}
                  </IDKitWidget>
                </div>
                <Link
                  href="/signup"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "40px",
                  }}
                >
                  <button className={styled.button3}>Forgot .Real ID</button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
