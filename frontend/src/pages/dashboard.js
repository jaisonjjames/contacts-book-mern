import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function Dashboard() {
  return (
    <>
      <Header />
      <Link to="/contact">Go to contact</Link>
    </>
  );
}

export default Dashboard;
