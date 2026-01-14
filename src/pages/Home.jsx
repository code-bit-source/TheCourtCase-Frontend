import React from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Awards from "@/components/sections/Awards";
import Features from "@/components/sections/Features";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
        <>
          <Hero />
          <Awards />
          <Features />
        </>
       
      <Footer />
    </div>
  );
};

export default Home;
