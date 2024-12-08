import React from "react";
import HeroImg from "../../assets/img/hero-image.png";

const HeroSection = () => {
  return (
    <div
      className="relative flex items-center bg-cover flex-start bg-center text-left h-svh w-full"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      <div className="absolute top-0 right-0 left-0"></div>
      <main className="px-10 lg:px-24 z-10">
        <div className="text-left">
          <h2 className="text-2xl text-white">티셔츠 / 상의</h2>
        </div>
        <p className="mt-3 text-white sm:max-w-xl text-6xl">겨울 시즌 팩</p>
        <p className="mt-3 text-white sm:max-w-xl text-2xl">
          따뜻함 / 단정함 / 편안함
        </p>
        <button className="border rounded mt-6 border-black hover:bg-white hover:text-black hover:border-black text-white bg-black w-44 h-12">
          쇼핑하기
        </button>
      </main>
    </div>
  );
};

export default HeroSection;
