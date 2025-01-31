import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import AddPetrolPumpModal from "./AddPetrolPumpModal";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          {/* Left side - Petrol Pump */}
          <Link href="/" className={styles.logo}>
            Petrol Pump
          </Link>

          {/* Right side - Add Petrol Pump button */}
          <button
            className={styles.button}
            onClick={() => setIsModalOpen(true)}
          >
            Add Petrol Pump
          </button>
        </div>
      </nav>

      {/* Modal Component */}
      {isModalOpen && <AddPetrolPumpModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Navbar;
