"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";

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
    <IDKitWidget
      app_id="app_staging_9cd4757eabeba0a355dd24c771aa78be" // obtained from the Developer Portal
      action="action"
      signal="wojfw" // this is your action name from the Developer Portal
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
        <button onClick={open}>handleVerify</button>
      )}
    </IDKitWidget>
  );
}
