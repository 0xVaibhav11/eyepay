"use client";
import styles from "./dashboard.module.scss";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { SiWikidata } from "react-icons/si";
import { BiTransfer } from "react-icons/bi";
import { LiaBookSolid } from "react-icons/lia";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineAppstoreAdd, AiOutlineSetting } from "react-icons/ai";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.nav}>
          <div>
            {/* Add your sidebar content here */}
            <div className={styles.avatardiv}>
              {/* <Image alt='avatar' className={styles.avatar} height={35} width={35} src="./images/assets/grid.svg" /> */}

              <RxAvatar color="#000" size={30} />
              <div className={styles.usernamediv}>user-Name</div>
            </div>
            <div>
              <hr />
            </div>
            <div className={styles.iconsdiv}>
              <MdOutlineQrCodeScanner color="#000" size={30} />
            </div>
            {/* 
              <Image
                alt="avatar"
                className={styles.icon}
                height={35}
                width={35}
                src="./images/assets/grid.svg"
              />
              <Image
                alt="avatar"
                className={styles.icon}
                height={35}
                width={35}
                src="./images/assets/grid.svg"
              />
            */}
            <button className={styles.button1}>New transection</button>
            <div className={styles.hroizontalline}>
              <hr />
            </div>
            <div className={styles.siebarItems}>
              <Link href="/">
                <div className={styles.items}>
                  <GoHome size={23} className={styles.icons1} />
                  <span>Home</span>
                </div>
              </Link>
              <Link href="/dashboard">
                <div className={styles.items}>
                  <SiWikidata size={23} className={styles.icons1} />
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link href="/dashboard/Transection">
                <div className={styles.items}>
                  <BiTransfer size={23} className={styles.icons1} />
                  <span>Transection</span>
                </div>
              </Link>
              <Link href="/dashboard/Assets">
                <div className={styles.items}>
                  <AiOutlineAppstoreAdd size={23} className={styles.icons1} />
                  <span>recetpt</span>
                </div>
              </Link>
              <Link href="/dashboard/Wrap">
                <div className={styles.items}>
                  <AiOutlineAppstoreAdd size={23} className={styles.icons1} />
                  <span>Wrap</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <section className={styles.content}>{children}</section>
      </main>
    </>
  );
}
