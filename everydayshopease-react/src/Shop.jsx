import React, { useEffect } from "react";
import HeroSection from "./components/HeroSection/HeroSection";
import NewArrivals from "./components/Sections/NewArrivals";
import content from "./data/content.json";
import Category from "./components/Sections/Categories/Category";
import Footer from "./components/Footer/Footer";
import { fetchCategories } from "./api/fetchCategories";

const Shop = () => {
  useEffect(() => {
    fetchCategories()
      .then((res) => {
        console.log("Categories ", res);
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <HeroSection />
      <NewArrivals />
      {content?.categories &&
        content?.categories?.map((item, index) => (
          <Category key={item?.title + index} {...item} />
        ))}
      <Footer content={content?.footer} />
    </>
  );
};

export default Shop;
