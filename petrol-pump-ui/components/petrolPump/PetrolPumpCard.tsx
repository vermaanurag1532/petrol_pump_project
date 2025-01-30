import React from "react";
import styles from "../styles/PetrolPumpCard.module.css"; // Import CSS module

interface PetrolPumpCardProps {
  id: string;
  name: string;
  location: string;
}

const PetrolPumpCard: React.FC<PetrolPumpCardProps> = ({ id, name, location }) => {
  return (
    <div className={styles.petrolPumpCard}>
      <span className={styles.pumpId}>{id}</span>
      <span className={styles.pumpName}>{name}</span>
      <span className={styles.pumpLocation}>{location}</span>
    </div>
  );
};

export default PetrolPumpCard;
