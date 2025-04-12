import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styles from "./Home.module.scss";
import WinnerPopup from "../../components/cards/WinnerPopup";
import { fetchWinners } from "../../redux/features/compDetails/compDetailsSlice"; 

const Home = () => {
  const dispatch = useDispatch();
  const { data: winners, loading } = useSelector((state) => state.winners);

  const [updates, setUpdates] = useState([]);
  const [selectedWinner, setSelectedWinner] = useState(null);

  // Fetch updates locally
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5");
        const formatted = response.data.map((item) => ({
          id: item.id,
          title: item.title,
          date: "Mar 25, 2025",
        }));
        setUpdates(formatted);
      } catch (error) {
        console.error("Error fetching updates:", error);
      }
    };

    fetchUpdates();
  }, []);

  // Fetch winners via thunk
  useEffect(() => {
    dispatch(fetchWinners());
  }, [dispatch]);

  return (
    <div className={styles.userHomeContainer}>
      {/* 📰 Updates Section */}
      <section className={styles.updatesSection}>
        <h2 className={styles.sectionTitle}>Latest Updates</h2>
        <ul className={styles.updateList}>
          {updates.map((update) => (
            <li key={update.id}>
              <strong>{update.title}</strong> <span className={styles.date}>({update.date})</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 🏆 Past Winners Section */}
      <section className={styles.winnersSection}>
        <h2 className={styles.sectionTitle}>Past Winners</h2>

        {loading ? (
          <p className={styles.loading}>Loading winners...</p>
        ) : (
          <div className={styles.winnerCards}>
            {winners.map((winner) => (
              <div
                key={winner.id}
                className={styles.winnerCard}
                onClick={() => setSelectedWinner(winner)}
              >
                <img src={winner.image} alt={winner.teamName} className={styles.cardImage} />
                <h4>{winner.teamName}</h4>
                <p>{winner.competition}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🔍 Popup on Card Click */}
      {selectedWinner && (
        <WinnerPopup winner={selectedWinner} onClose={() => setSelectedWinner(null)} />
      )}
    </div>
  );
};

export default Home;
