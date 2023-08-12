import styles from "./page.module.scss";

export default function NewTransection() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.heading}>Transaction</div>
        <div>
          <div className={styles.a}>
            {/* <div className={styles.tabs}>
              <div className={styles.button}>tab1</div>
              <div className={styles.button} style={{ marginLeft: "40px" }}>
                tab2
              </div>
            </div> */}
            <div className={styles.b}>chains</div>
          </div>
          <hr />
        </div>

        <div className={styles.Transection}>
          <h2>2 aug 4:30 pm</h2>
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Order id</th>
                <th>chain</th>
                <th>status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>30</td>
                <td>1172478989</td>
                <td>zora</td>
                <td>success</td>
              </tr>
              <tr>
                <td>drone</td>
                <td>drone</td>
                <td>drone</td>
                <td>drone</td>
              </tr>
              <tr>
                <td>drone</td>
                <td>drone</td>
                <td>drone</td>
                <td>drone</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
