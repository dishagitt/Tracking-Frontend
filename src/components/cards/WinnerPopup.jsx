import React from "react";
import styles from "./WinnerPopup.module.scss";

const WinnerPopup = ({ winner, onClose }) => {
  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupCard} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✖</button>
        <img src={winner.image} alt={winner.teamName} className={styles.popupImage} />
        <h3>{winner.teamName}</h3>
        <p><strong>Competition:</strong> {winner.competition}</p>
        <p><strong>Problem:</strong> {winner.problem}</p>
        <p><strong>Abstract:</strong> {winner.abstract}</p>
      </div>
    </div>
  );
};

export default WinnerPopup;
