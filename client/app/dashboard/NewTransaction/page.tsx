import styles from "./page.module.scss";

export default function NewTransection() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.heading}>New-Transaction</div>
        <div>
          <div className={styles.a}>
            <div className={styles.b}>chains</div>
          </div>
          <hr />
        </div>

        <div className={styles.Transection}>
          <div className={styles.container}>
            <div className={styles.searchcontainer}>
              <input className={styles.input} type="text" />
              <svg viewBox="0 0 24 24" className={styles.searchicon}>
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
            </div>
          </div>
          <div className={styles.cardcontainer}>
            <div className={styles.container1}>
              <div className={styles.searchcontainer}>
                <div className={styles.carddiv}>
                  <div className={styles.content1}>
                    <div style={{ fontWeight: "bolder" }}>
                      Connect your Wallet!
                    </div>
                    <div className={styles.connect}>connect</div>
                    <div>
                      <span style={{ color: "black", marginTop: "10px" }}>
                        you are pyaing to
                      </span>{" "}
                      <span>| vaibhav.orb</span>
                    </div>
                  </div>
                  <div className={styles.content2}>
                    <div className={styles.data}>
                      <div>
                        <div className={styles.inputs}>
                          <div>
                            <div>
                              select your network 👇
                              <form>
                                <select
                                  style={{
                                    padding: "10px 0px 10px 0px",
                                    backgroundColor: "white",
                                    color: "black",
                                    borderRadius: "5px",
                                    fontSize: "18px",
                                  }}
                                  className=""
                                  name="languages"
                                  id="lang"
                                >
                                  <option
                                    style={{ padding: "10px 0px 10px 0px" }}
                                    className=""
                                    value="fuji"
                                  >
                                    fuji
                                  </option>
                                  <option
                                    style={{ padding: "10px 0px 10px 0px" }}
                                    className=""
                                    value="mumbai"
                                  >
                                    mumbai
                                  </option>
                                  <option
                                    style={{ padding: "10px 0px 10px 0px" }}
                                    className=""
                                    value="goarli"
                                  >
                                    goarli
                                  </option>
                                  <option
                                    style={{ padding: "10px 0px 10px 0px" }}
                                    className=""
                                    value="optimisum gorali"
                                  >
                                    optimisum gorali
                                  </option>
                                </select>
                              </form>
                            </div>
                            <div>
                              select your Coin 👇
                              <form>
                                <select
                                  style={{
                                    padding: "10px 0px 10px 0px",
                                    backgroundColor: "white",
                                    color: "black",
                                    borderRadius: "5px",
                                    fontSize: "18px",
                                  }}
                                  className=""
                                  name="languages"
                                  id="lang"
                                >
                                  <option
                                    style={{ padding: "10px 0px 10px 0px" }}
                                    className=""
                                    value="fussy"
                                  >
                                    usdc
                                  </option>
                                  <option
                                    style={{ padding: "10px 0px 10px 0px" }}
                                    className=""
                                    value="fussy"
                                  >
                                    Eth
                                  </option>
                                </select>
                              </form>
                            </div>
                          </div>
                          <div>
                            <span>enter amount </span>
                            <div>
                              <input className={styles.input1} />
                            </div>
                            <button className={styles.button2}>pay</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
