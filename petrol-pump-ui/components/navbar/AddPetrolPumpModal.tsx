import React, { useState } from "react";
import styles from "../styles/Modal.module.css";

interface ModalProps {
  closeModal: () => void;
}

const AddPetrolPumpModal: React.FC<ModalProps> = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddPetrolPump = async () => {
    if (!name || !location) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    const newPump = {
      name,
      location,
    };

    try {
      const response = await fetch("http://localhost:3000/PetrolPumps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPump),
      });

      if (!response.ok) {
        throw new Error("Failed to add petrol pump.");
      }

      alert("Petrol pump added successfully!");
      closeModal();
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.heading}>Add Petrol Pump</h2>
        {error && <p className={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={styles.input}
        />

        <div className={styles.buttonContainer}>
          <button
            className={styles.addButton}
            onClick={handleAddPetrolPump}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
          <button className={styles.cancelButton} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPetrolPumpModal;
