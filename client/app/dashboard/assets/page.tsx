import styles from "./page.module.scss";
// import "./page.css";
export default function Assets() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.card}>
          <div className={styles.icon}></div>

          <div className={styles.content}>
            <h3>Title</h3>
            <p>Lorem ipsum dolor sit amet, consectetur </p>
          </div>
        </div>
      </div>
    </>
  );
}
