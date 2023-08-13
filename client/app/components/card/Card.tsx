// import "./card.css";
import styles from "./Card.module.scss";
import Image from "next/image";
export default function Card() {
  return (
    <>
      <div>
        <div className={styles.card1}>
          <Image
            priority
            src="/sponserpngs/background image.png"
            alt="arrow"
            width={542}
            height={268}
            style={{ border: "1px", borderRadius: "10px" }}
          />
          <p className="heading">Powered By</p>
          <p>Worldcoin , LayerZero , zora</p>
          <p>🕸️...</p>
        </div>
      </div>
    </>
  );
}
