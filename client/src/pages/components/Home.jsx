import React from "react";
import DarkModeToggle from "../extras/DarkModeToggle";
import { CircularProgress } from "@mui/material";

const Home = () => {
  return (
    <>
      <DarkModeToggle />
      <div className="">Smart Care: Real Time Health Monitoring System</div>
      <CircularProgress className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
    </>
  );
};

export default Home;
