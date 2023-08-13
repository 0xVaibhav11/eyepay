"use client";
import styles from "./page.module.scss";
import React from "react";
import axios from "axios";
import { SplineViewer } from "../components/Threed";
import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";

export default function LoginWithWorldcoin() {
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
          <div className={styles.card}>
            {/* <SplineViewer eventsTarget="global" /> */}

            <div className={styles.title}>Start with Eye Pay 👏</div>
            <IDKitWidget
              app_id="app_staging_9cd4757eabeba0a355dd24c771aa78be" // obtained from the Developer Portal
              action="action"
              signal="wojfw"
              onSuccess={
                (onSuccess = (result: ISuccessResult) => {
                  console.log(result);
                  const data: reqBody = {
                    merkle_root: result.merkle_root,
                    nullifier_hash: result.nullifier_hash,
                    proof: result.proof,
                    credential_type: result.credential_type,
                    action: "action", // or get this from environment variables,
                    signal: "wojfw", // if we don't have a signal, use the empty string
                  };
                  axios.post("http://localhost:8081/api", data).then((res) => {
                    console.log(res);
                    console.log(res.data);
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
                <button type="button" className={styles.button} onClick={open}>
                  handleVerify
                </button>
              )}
            </IDKitWidget>
          </div>
        </div>
        <div className={styles.card1}>
          <div className={styles.spline1}>
            {/* < scene="https://prod.spline.design/LgYxjBYA3hz0em38/scene.splinecode" /> */}
            <SplineViewer eventsTarget="global" />
          </div>
        </div>
      </div>
    </div>
  );
}
