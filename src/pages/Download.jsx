import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const platforms = [
  {
    name: "iOS & iPadOS",
    icon: "https://cdn-icons-png.flaticon.com/512/731/731985.png",
    link: "#",
  },
  {
    name: "Android",
    icon: "https://cdn-icons-png.flaticon.com/512/174/174836.png",
    link: "#",
  },
  {
    name: "Windows",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
    link: "#",
  },
  {
    name: "macOS",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732223.png",
    link: "#",
  },
  {
    name: "Linux",
    icon: "https://cdn-icons-png.flaticon.com/512/6124/6124997.png",
    link: "#",
  },
  {
    name: "Extension",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
    link: "#",
  },
];

const Download = () => {
  return (
    <div className="bg-[#F6F8FF] min-h-screen">
      <Header />

      {/* HERO */}
      <section className="pt-32 pb-14 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1E] tracking-tight">
          Use TickTick across all platforms
        </h1>
        <p className="text-[18px] text-[#6B6B6B] mt-4">
          Enjoy powerful features on all platforms, or use our{" "}
          <a href="#" className="underline hover:text-[#5068F2]">
            web app
          </a>
        </p>
      </section>

      {/* PLATFORMS */}
      <section className="pb-24">
        <div className="container max-w-[1100px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 px-6">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="bg-white rounded-3xl p-6 flex flex-col items-center shadow-sm hover:shadow-lg transition-all cursor-pointer"
            >
              <img src={p.icon} alt={p.name} className="w-14 h-14 mb-3" />
              <p className="font-semibold text-[15px] text-[#1E1E1E]">
                {p.name}
              </p>
              <span className="text-[#5068F2] text-sm font-medium mt-1">
                Download
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* DEVICES SHOWCASE */}
      <section className="pb-24">
        <div className="container max-w-[1300px] mx-auto px-6 text-center">
          <img
            src="https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/platform.png"
            alt="Devices Showcase"
            className="w-full h-auto mx-auto"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Download;
