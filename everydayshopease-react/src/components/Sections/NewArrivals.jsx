import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Sections/NewArrivals.css";
import SectionHeading from "./SectionHeading/SectionHeading";
import Card from "../Card/Card";
import Jeans from "../../assets/img/jeans.png";
import Dress from "../../assets/img/dress.png";
import Shirts from "../../assets/img/shirts.png";
import Tshirt from "../../assets/img/tshirts.png";
import Joggers from "../../assets/img/joggers.png";
import Accessory from "../../assets/img/accessory.png";
import { responsive } from "../../utils/Section.constants";

const items = [
  {
    title: "데미지 워시드 데님 팬츠-미디엄 블루",
    imagePath: Jeans,
  },
  {
    title: "오버핏 포레스트 체크 셔츠-블랙",
    imagePath: Shirts,
  },
  {
    title: "노스텔지아 피그먼트 티셔츠_차콜",
    imagePath: Tshirt,
  },
  {
    title: "Reverse Logo Long OPS",
    imagePath: Dress,
  },
  {
    title: "(Renew Ver.) 원턱 와이드 스웨트 팬츠",
    imagePath: Joggers,
  },
  {
    title: "언매치드 프렌즈 키링",
    imagePath: Accessory,
  },
];

const NewArrivals = () => {
  return (
    <>
      <SectionHeading title={"신상"} />
      <Carousel
        responsive={responsive}
        autoPlay={false}
        swipeable={true}
        draggable={false}
        showDots={false}
        infinite={false}
        partialVisbile={false}
        itemClass={"react-slider-custom-item"}
        className="px-8"
      >
        {items &&
          items?.map((item) => (
            <Card key={item} title={item?.title} imagePath={item.imagePath} />
          ))}
      </Carousel>
    </>
  );
};

export default NewArrivals;
