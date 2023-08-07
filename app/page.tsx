"use client";
import React from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";
import { useDeviceSize } from "./components/useDeviceSize";

import { SplineViewer } from "./components/Threed";
import Button from "./components/Button/Button";
import Card from "./components/card/Card";
import base from "../public/sponserpngs/base.png";

const LOGO_WIDTH = 432;
const LOGO_HEIGHT = 122;
const k_SCALE = 3.1;

export default function Home() {
  const { width, height } = useDeviceSize();
  const [line2Txt, setLine2Txt] = React.useState("SEEMLESS");
  return (
    <>
      <main className={styles.main}>
        <div className={styles.background}>
          <Image
            className={styles.bggrid1}
            src="/images/assets/grid.svg"
            priority
            alt="grid1"
            width={250}
            height={250}
          />
          <Image
            className={styles.bggrid2}
            src="/images/assets/grid2.svg"
            priority
            alt="grid1"
            width={240}
            height={240}
          />

          <Image
            className={styles.line1}
            src="/images/assets/line2.svg"
            priority
            alt="grid1"
            width={width / 1.3}
            height={height / 1.3}
          />

          {/* <Image
            priority
            src="/images/assets/line.svg"
            alt="grid1"
            width={300}
            height={300}
            className={styles.bggrid2}
          />
          <Image
            priority
            src="/images/assets/line2.svg"
            alt="grid1"
            width={300}
            height={300}
            className={styles.line}
          />
          <Image
            priority
            src="/images/assets/grid.svg"
            alt="grid1"
            width={300}
            height={300}
            className={styles.sparkleFilled}
          />
          <Image
            priority
            src="/images/assets/grid.svg"
            alt="grid1"
            width={300}
            height={300}
            className={styles.sparkleOutlined}
          /> */}
        </div>
        <div className={styles.header}>
          <div className={styles.nav}>
            <div className={styles.logo}>
              <Image
                priority
                autoSave="true"
                src="/eyelogo.svg"
                alt="logo"
                width={LOGO_WIDTH / k_SCALE}
                height={LOGO_HEIGHT / k_SCALE}
              />
            </div>
            <div className={styles.links}>
              <div className={styles.link}>
                <Link href="/dashboard">Dashboard</Link>
              </div>
              <div className={styles.link}>
                <Link href="/Docs">Docs</Link>
              </div>
              <div className={styles.link}>
                <Link href="/app">Github</Link>
              </div>
            </div>
          </div>
          <div className={styles.hero}>
            <div className={styles.line1}>
              <h1 className={styles.title}>EMPOWERING</h1>
              <div className={styles.sparkle}>
                <Image
                  priority
                  src="/images/assets/sparkle-filled.svg"
                  alt="sparkle"
                  width={67}
                  height={67}
                />
              </div>
            </div>
            <div className={styles.line2}>
              <div className={styles.eye}>
                <SplineViewer eventsTarget="global" />
              </div>
              <h1 className={styles.title}>SEEMLESS</h1>
              <div className={styles.arrow}>
                <Image
                  priority
                  src="/images/assets/arrow.svg"
                  alt="arrow"
                  width={155}
                  height={88}
                />
              </div>
            </div>
            <div className={styles.line3}>
              <div className={styles.sparkle}>
                <Image
                  priority
                  src="/images/assets/sparkle-outline.svg"
                  alt="sparkle"
                  width={67}
                  height={67}
                />
              </div>
              <h1 className={styles.title}>PAYMENTS</h1>
              <div className={styles.eye}>
                <SplineViewer eventsTarget="global" />
              </div>
            </div>
          </div>
          <div className={styles.getStartedbutton}>
            <div>
              <Button />
            </div>
          </div>
        </div>
        <div className={styles.section2}>
          <div className={styles.threed}>
            <SplineViewer
              // url="https://prod.spline.design/FVZWbQH2B6ndj9UU/scene.splinecode"
              eventsTarget="global"
            />
          </div>
          <div>
            <div className={styles.card1}>
              <div
                style={{
                  fontSize: "20px",
                  display: "flex",
                  justifyContent: "center",
                  placeItems: "center",
                  color: "black",
                }}
                className={styles.paragraph}
              >
                compiled client and server successfully in 312 ms (20 modules) -
                wait compiling... - event compiled client and server
                successfully in 162 ms (20 modules) - wait compiling /page
                (client and server)... - event compiled client and server
                successfully in 3s (518 modules) - wait compiling
                /favicon.ico/route ( client and server)... - event compiled
                successfully in 362 ms (323 modules)
              </div>
              <Card />
            </div>
          </div>
        </div>
        <div className={styles.section3}>
          <div className={styles.heading5}>
            sponsered
            <h1
              style={{ transform: "rotate(-24deg)" }}
              className={styles.span1}
            >
              by
              <Image
                priority
                src="/images/assets/sparkle-outline.svg"
                alt="sparkle"
                width={67}
                height={67}
              />
            </h1>
          </div>
          <div className={styles.sponsers}>
            <div className={styles.items}>
              <Image
                priority
                src="/sponserpngs/optimisum.png"
                alt="arrow"
                width={155}
                height={58}
              />{" "}
              <Image
                priority
                src="/sponserpngs/worldcoin.png"
                alt="arrow"
                width={155}
                height={32}
              />{" "}
              <Image
                priority
                src="/sponserpngs/hyperlane.png"
                alt="arrow"
                width={155}
                height={58}
              />
            </div>
            <div className={styles.items}>
              <Image
                priority
                src="/sponserpngs/zora.png"
                alt="arrow"
                width={155}
                height={58}
              />
              <Image
                priority
                src="/sponserpngs/base.png"
                alt="arrow"
                width={155}
                height={68}
              />
              <Image
                priority
                src="/sponserpngs/mode.png"
                alt="arrow"
                width={155}
                height={68}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
