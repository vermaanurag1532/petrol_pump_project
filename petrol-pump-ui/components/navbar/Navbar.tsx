import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Left side - Petrol Pump */}
        <Link href="/" className={styles.logo}>
          Petrol Pump
        </Link>

        {/* Right side - Add Petrol Pump button */}
        <Link href="/add-petrol-pump">
          <button className={styles.button}>
            Add Petrol Pump
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
