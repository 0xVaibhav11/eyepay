"use client";
import styles from "./page.module.scss";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { SplineViewer } from "../components/Threed";
import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { useConnect, useAccount } from "wagmi";
import { Wallet } from "ethers";
export default function LoginWithWorldcoin() {
  const [success, setSuccess] = useState(true);
  const [nameflag, setNameflag] = useState(false);
  const [Addres, setAddress] = useState("");
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { connector: activeConnector, isConnected, address } = useAccount();

  const [userID, setUserID] = useState("");
  let onSuccess = (data: any) => {
    console.log("onSuccess", data);
  };
  type reqBody = {
    merkle_root: string;
    nullifier_hash: string;
    proof: string;
    credential_type: string;
    action: string; // or get this from environment variables,
    signal: string; // if we don't have a signal, use the empty string
  };

  const [nameId, setNameID] = useState("");
  const [verified, setVerified] = useState(false);
  const [userData, setUserData] = useState({} as any);
  return (
    <div className={styles.main}>
      <div className={styles.night}>
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
        <div className={styles.shooting_star} />
      </div>
      <div className={styles.forground}>
        <div className={styles.card2}>
          <form className={styles.form}>
            <p id={styles.heading}>choose your orb ID</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              example ajay.orb
            </div>
            {nameflag && (
              <div
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                this id is already taken{" "}
              </div>
            )}
            <div
              className={styles.field}
              style={{
                marginTop: "20px",
              }}
            >
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
                className={styles.inputfield}
                onChange={async (e) => {
                  setUserID(e.target.value);
                  try {
                    const res = await axios.get(
                      `http://localhost:8081/nft/${e.target.value}`
                    );
                    console.log(res.data[0]);
                    setUserData(res.data[0]);
                    if (res.data.length > 0) {
                      setNameflag(true);
                    } else {
                      setNameflag(false);
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }}
                placeholder="RealID"
                autoComplete="off"
              />
            </div>
            <div
              className={styles.field}
              style={{
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <input
                type="text"
                className={styles.inputfield}
                onChange={async (e) => {
                  setAddress(e.target.value);
                }}
                placeholder="Enter your address"
                autoComplete="off"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <IDKitWidget
                app_id="app_staging_9cd4757eabeba0a355dd24c771aa78be" // obtained from the Developer Portal
                action="nftcreate"
                signal="nftcreate"
                onSuccess={
                  (onSuccess = (result: ISuccessResult) => {
                    console.log(result);
                    const data: reqBody = {
                      merkle_root: result.merkle_root,
                      nullifier_hash: result.nullifier_hash,
                      proof: result.proof,
                      credential_type: result.credential_type,
                      action: "nftcreate", // or get this from environment variables,
                      signal: "nftcreate", // if we don't have a signal, use the empty string
                    };
                    axios
                      .post("http://localhost:8081/api", data)
                      .then((res) => {
                        console.log(res);
                        console.log(res.data);
                        axios.post("http://localhost:8081/nft", {
                          orbID: userID,
                          address: Addres,
                          ownerNull: result.merkle_root,
                        });
                        setSuccess(false);
                      });

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
                    className={styles.button1}
                    onClick={async () => {
                      open();
                    }}
                  >
                    verify with worldID
                  </button>
                )}
              </IDKitWidget>
            </div>
            {!success && (
              <Link
                href="/dashboard"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {" "}
                <button className={styles.button1}> Go to Dashboard</button>
              </Link>
            )}
          </form>
        </div>
        <div
          style={{
            maxWidth: "100%",
          }}
        >
          <div className={styles.spline1}>
            {/* < scene="https://prod.spline.design/LgYxjBYA3hz0em38/scene.splinecode" /> */}
            <SplineViewer eventsTarget="global" />
          </div>
        </div>
      </div>
    </div>
  );
}
