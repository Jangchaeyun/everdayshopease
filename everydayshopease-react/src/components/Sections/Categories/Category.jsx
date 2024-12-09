import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import Card from "../../Card/Card";

const Category = ({ title, data }) => {
  return (
    <>
      <SectionHeading title={title} />
      {data &&
        data?.map((item, index) => {
          return (
            <Card
              title={item?.title}
              description={item?.description}
              imagePath={item?.image}
              actionArrow={true}
            />
          );
        })}
    </>
  );
};

export default Category;
