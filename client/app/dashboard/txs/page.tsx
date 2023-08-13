import styles from "./page.module.scss";
import React from "react";

type data1 = {
  transaction_hash: string;
  from: string;
  to: string;
  time: string;
  value: string;
};
const Transection: React.FC = () => {
  const data: Array<data1> = [
    {
      transaction_hash: "0xf491799e95e56dE7587a753b78a557db773943Ae",
      from: "0xf491799e95e56dE7587a753b78a557db773943Ae",
      to: "0xf491799e95e56dE7587a753b78a557db773943Ae",
      time: "30.00",
      value: "50",
    },
    {
      transaction_hash: "0xf491799e95e56dE7587a753b78a557db773943Ae",
      from: "0xf491799e95e56dE7587a753b78a557db773943Ae",
      to: "0xf491799e95e56dE7587a753b78a557db773943Ae",
      time: "30.00",
      value: "50",
    },
    {
      transaction_hash: "0xf491799e95e56dE7587a753b78a557db773943Ae",
      from: "0xf491799e95e56dE7587a753b78a557db773943Ae",
      to: "0xf491799e95e56dE7587a753b78a557db773943Ae",
      time: "30.00",
      value: "50",
    },
    {
      transaction_hash: "0xf491799e95e56dE7587a753b78a557db773943Ae",
      from: "0xf491799e95e56dE7587a753b78a557db773943Ae",
      to: "0xf491799e95e56dE7587a753b78a557db773943Ae",
      time: "30.00",
      value: "50",
    },
  ];
  return (
    <>
      <div className={styles.main}>
        <div className={styles.heading}>Transaction</div>
        <div>
          <div className={styles.a}>
            <div className={styles.b}>chains</div>
          </div>
          <hr />
        </div>

        <div className={styles.Transection}>
          <h2>2 august</h2>
          <table>
            <thead>
              <tr>
                <th>Transaction hash </th>
                <th>From </th>
                <th>To</th>
                <th>Time</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {data.map((tsx) => {
                return (
                  <>
                    <tr>
                      <td>{tsx.transaction_hash}</td>
                      <td>
                        {`${tsx.from.substr(0, 8)}......${tsx.from.substr(
                          34,
                          42
                        )}`}
                      </td>
                      <td>
                        {`${tsx.to.substr(0, 8)}......${tsx.to.substr(34, 42)}`}
                      </td>
                      <td>{tsx.time}</td>
                      <td>{tsx.value}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Transection;
