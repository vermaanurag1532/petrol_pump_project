import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPetrolPumps } from "../../store/petrolPumpSlice";
import { RootState, AppDispatch } from "../../store";
import PetrolPumpCard from "./PetrolPumpCard";
import styles from "../styles/PetrolPumpList.module.css"; 

const PetrolPumpList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { petrolPumps, status, error } = useSelector((state: RootState) => state.petrolPump);

  useEffect(() => {
    dispatch(fetchPetrolPumps());
  }, [dispatch]);

  if (status === "loading") return <p className={styles.loadingText}>Loading petrol pumps...</p>;
  if (status === "failed") return <p className={styles.errorText}>Error: {error}</p>;

  return (
    <div className={styles.petrolPumpList}>
      {petrolPumps.map((pump: any) => (
        <PetrolPumpCard
          key={pump.petrolPumpID}
          id={pump.petrolPumpID}
          name={pump.Name}
          location={pump.Location}
        />
      ))}
    </div>
  );
};

export default PetrolPumpList;
