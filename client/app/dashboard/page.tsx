"use client";
import React from "react";
import styles from "./dashboard.module.scss";
import { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";
import Link from "next/link";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Dashboard() {
  const chartData = {
    options: {
      colors: ["#818cf8"],
      chart: {
        height: "auto",
      },
      dropShadow: {
        enabled: false,
        color: "#000",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },

      dataLabels: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
      colors: [" #818cf8"],
    },

    series: [
      {
        name: "Sales",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 150, 200, 220],
      },
    ],
  };

  return (
    <>
      <div className={styles.wapper}>
        <div>
          <div className={styles.container1}>
            <div>
              <span className={styles.heading1}>Account info</span>
              <div className={styles.card1}>
                <div className={styles.background1}>
                  <div className={styles.arrange}>
                    <div>
                      <img src="./avatar.png" className={styles.avatar} />
                    </div>

                    <table
                      style={{
                        padding: "25px",
                      }}
                    >
                      <tr>
                        <td
                          style={{
                            color: "#818cf8",
                            padding: "5px",
                            fontSize: "19px",
                            fontWeight: "bold",
                          }}
                        >
                          User name
                        </td>
                        <td
                          style={{
                            color: "white",
                            padding: "5px",
                            fontSize: "19px",
                            fontWeight: "bold",
                          }}
                        >
                          vanoob
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            color: "#818cf8",
                            padding: "5px",
                            fontSize: "19px",
                            fontWeight: "bold",
                          }}
                        >
                          Account address
                        </td>
                        <td
                          style={{
                            color: "white",
                            padding: "5px",
                            fontSize: "19px",
                            fontWeight: "bold",
                          }}
                        >
                          0x434056u5
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            color: "#818cf8",
                            padding: "5px",
                            fontSize: "19px",
                            fontWeight: "bold",
                          }}
                        >
                          Amount
                        </td>
                        <td
                          style={{
                            color: "white",
                            padding: "5px",
                            fontSize: "19px",
                            fontWeight: "bold",
                          }}
                        >
                          3000 Eth
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div className={styles.background2}>
                  <div
                    style={{
                      color: "rgb(255,196,186)",
                      fontSize: "16px",
                      padding: "12px",
                    }}
                  ></div>
                  <div className={styles.buttonDiv}>
                    <Link href="/dashboard/assets">
                      <button className={styles.button}>View Assets</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className={styles.heading2}>Recent Transection&apos;s</span>
              <div className={styles.card2}>
                <div className={styles.subcard}>
                  <div className={styles.a}>30</div>
                  <div>0x2333dflk3erj3q2....</div>
                </div>
                <div className={styles.subcard}>
                  {" "}
                  <div className={styles.a}>30</div>
                  <div>0x2333dflk3erj3q2....</div>
                </div>
                <div className={styles.subcard}>
                  {" "}
                  <div className={styles.a}>30</div>
                  <div>0x5833dflk3erj3q2....</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.span1}>Overall </div>

          <div className={styles.container2}>
            <div>
              <div className={styles.card3}>
                <ReactApexChart
                  options={chartData.options}
                  series={chartData.series}
                  type="area"
                  height={400}
                  width={1100}
                />
              </div>
            </div>
            {/* <div className={styles.card4}></div> */}
          </div>
        </div>
      </div>
    </>
  );
}
