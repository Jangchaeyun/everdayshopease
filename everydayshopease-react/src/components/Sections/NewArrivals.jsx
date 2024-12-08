import React from "react";
import SectionHeading from "./SectionHeading/SectionHeading";
import Card from "../Card/Card";
import Jeans from "../../assets/img/jeans.png";
import Dress from "../../assets/img/dress.png";
import Shirts from "../../assets/img/shirts.png";
import Tshirt from "../../assets/img/tshirts.png";
import Joggers from "../../assets/img/joggers.png";
import Accessory from "../../assets/img/accessory.png";

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
      <div className="flex flex-wrap">
        {items &&
          items?.map((item, index) => (
            <Card
              key={item}
              title={item?.title + index}
              imagePath={item.imagePath}
            />
          ))}
      </div>
    </>
  );
};

export default NewArrivals;
