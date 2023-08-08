import styles from "./page.module.scss";
import type { Tabs, TabItem } from "flowbite-svelte";

export default function Transection() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.heading}>Transaction</div>
        <div>
          <div className={styles.a}>
            <div className={styles.tabs}>
              <div className={styles.button}>tab1</div>
              <div className={styles.button} style={{ marginLeft: "40px" }}>
                tab2
              </div>
            </div>
            <div className={styles.b}>chains</div>
          </div>
          <hr />
          <div></div>
          <div className={styles.heading1}>
            <div className={styles.items1}>Name</div>

            <div className={styles.items2}>Balance</div>
            <div className={styles.items2}>Value</div>
          </div>
          <div style={{ color: "black", padding: "10px", marginTop: "5px" }}>
            2 aug 12:34pm
          </div>
          <div className={styles.heading1}>
            <div className={styles.items1}>Bitcoin</div>

            <div className={styles.items2}>Balance</div>
            <div className={styles.items2}>Value</div>
          </div>
        </div>
      </div>
    </>
  );
}
