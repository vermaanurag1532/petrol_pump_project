import React, { useEffect, useState } from "react";
import PetrolPumpCard from "./PetrolPumpCard";
import styles from "../styles/PetrolPumpList.module.css";

interface PetrolPump {
  petrolPumpID: string;
  Name: string;
  Location: string;
}

const PetrolPumpList: React.FC = () => {
  const [petrolPumps, setPetrolPumps] = useState<PetrolPump[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPetrolPumps = async () => {
      try {
        const response = await fetch("http://localhost:3000/PetrolPumps");
        if (!response.ok) throw new Error("Failed to fetch petrol pumps");

        const data: PetrolPump[] = await response.json();
        setPetrolPumps(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPetrolPumps();
  }, []);

  if (loading) return <p className={styles.loadingText}>Loading petrol pumps...</p>;
  if (error) return <p className={styles.errorText}>Error: {error}</p>;

  return (
    <div className={styles.petrolPumpList}>
      {petrolPumps.map((pump) => (
        <PetrolPumpCard key={pump.petrolPumpID} id={pump.petrolPumpID} name={pump.Name} location={pump.Location} />
      ))}
    </div>
  );
};

export default PetrolPumpList;
