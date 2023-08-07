import React from "react";
import styles from "./dashboard.module.scss";

export default function Dashboard() {
  return (
    <>
      <div className={styles.wapper}>
        <div>
          <div className={styles.container1}>
            <div>
              <span className={styles.heading1}>Account info</span>
              <div className={styles.card1}>
                <div>
                  <img src="./avatar.png" className={styles.avatar} />
                </div>
                <div className={styles.cardData}>
                  <div className={styles.data}>
                    <span style={{ color: "black", padding: "12px" }}>
                      Acc Adress
                    </span>{" "}
                    0x23dfgrwe33t45.....
                  </div>
                  <div className={styles.data}>
                    <span style={{ color: "#00FFFF", padding: "20px" }}>
                      id
                    </span>{" "}
                    0x23dfgrwe33t45.....
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      color: "rgb(255,196,186)",
                      fontSize: "16px",
                      padding: "12px",
                    }}
                  >
                    Tokens - 0
                  </div>

                  <div className={styles.buttonDiv}>
                    <button className={styles.button}>View Assets</button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className={styles.heading2}>overview</span>
              <div className={styles.card2}>
                <div className={styles.subcard}></div>
                <div className={styles.subcard}></div>
                <div className={styles.subcard}></div>
              </div>
            </div>
          </div>

          <div className={styles.span1}>Connect & Transection</div>

          <div className={styles.container2}>
            <div>
              <div className={styles.card3}></div>
            </div>
            <div className={styles.card4}></div>
          </div>

          <div className={styles.span2}>Apps</div>
          <div className={styles.container3}>
            <div className={styles.card5}></div>
            <div className={styles.card5}></div>
            <div className={styles.card5}></div>
          </div>
        </div>
      </div>
    </>
  );
}
