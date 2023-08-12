"use client";
import styles from "./dashboard.module.scss";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { SiWikidata } from "react-icons/si";
import { BiTransfer } from "react-icons/bi";
import { LiaBookSolid } from "react-icons/lia";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineAppstoreAdd, AiOutlineSetting } from "react-icons/ai";

import { IconType } from "react-icons";

import { Url } from "next/dist/shared/lib/router/router";
type a = {
  path: Url;
  name: string;
  icon: IconType;
};

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState(1);
  const sideBarItems: Array<a> = [
    {
      path: "/",
      name: "home",
      icon: GoHome,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: SiWikidata,
    },
    {
      path: "/dashboard/txs",
      name: "Transection",
      icon: BiTransfer,
    },
    {
      path: "/dashboard/assets",
      name: "Assets",
      icon: AiOutlineAppstoreAdd,
    },
  ];

  return (
    <>
      <main className={styles.main}>
        <div className={styles.nav}>
          <div>
            {/* Add your sidebar content here */}
            <div className={styles.avatardiv}>
              {/* <Image alt='avatar' className={styles.avatar} height={35} width={35} src="./images/assets/grid.svg" /> */}

              <RxAvatar color="#000" size={30} />
              <div className={styles.usernamediv}>vnoob.orb</div>
            </div>
            <div>
              <hr />
            </div>
            {/* <div className={styles.iconsdiv}>
              <MdOutlineQrCodeScanner color="#000" size={30} />
            </div> */}

            <Link href="/dashboard/payto">
              <div className={styles.buttondiv}>
                <button
                  className={styles.button1}
                  onClick={() => setSelected(10)}
                >
                  Pay to user
                </button>
              </div>
            </Link>

            <div className={styles.hroizontalline}>
              <hr />
            </div>
            <div className={styles.siebarItems}>
              {sideBarItems.map((item, index) => {
                return (
                  <Link key={item.name} href={item.path}>
                    <div
                      className={
                        selected === index
                          ? ` ${styles.items}`
                          : ` ${styles.items1}`
                      }
                      onClick={() => setSelected(index)}
                    >
                      <item.icon size={23} className={styles.icons1} />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <section className={styles.content}>{children}</section>
      </main>
    </>
  );
}
