import styles from "./page.module.scss";

export default function Wrap() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.button}>wrap</div>
            <div className={styles.button}>Unwrap</div>
          </div>
          <div className={styles.group}>
            <input
              placeholder="Search"
              type="search"
              className={styles.input}
            />
          </div>
          <div className={styles.group}>
            <input
              placeholder="Search"
              type="search"
              className={styles.input}
            />
          </div>
        </div>
      </div>
    </>
  );
}
