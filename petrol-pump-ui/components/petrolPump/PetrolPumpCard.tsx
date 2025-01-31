import React from "react";
import styles from "../styles/PetrolPumpCard.module.css"; // Import CSS module
import Link from "next/link"; // Import Link from Next.js

interface PetrolPumpCardProps {
  id: string;
  name: string;
  location: string;
}

const PetrolPumpCard: React.FC<PetrolPumpCardProps> = ({ id, name, location }) => {
  return (
    <Link href={`/${id}`} className={styles.petrolPumpCard}>
      <span className={styles.pumpId}>{id}</span>
      <span className={styles.pumpName}>{name}</span>
      <span className={styles.pumpLocation}>{location}</span>
    </Link>
  );
};

export default PetrolPumpCard;
