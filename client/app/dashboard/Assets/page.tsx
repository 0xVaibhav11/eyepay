import styles from "./page.module.scss";

export default function Assets() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.heading}>Assets</div>
        <div>
          <hr />

          <div className={styles.heading1}>
            <div className={styles.items2}>Balance</div>
            <div className={styles.items2}>Value</div>
          </div>
        </div>
      </div>
    </>
  );
}
