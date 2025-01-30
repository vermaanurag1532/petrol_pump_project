import React from "react";
import PetrolPumpList from "../../components/petrolPump/PetrolPumpList";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <Navbar />
      <PetrolPumpList />
    </div>
  );
};

export default Home;
