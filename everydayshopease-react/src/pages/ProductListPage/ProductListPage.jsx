import React, { useMemo } from "react";
import FilterIcon from "../../components/common/FilterIcon";
import content from "../../data/content.json";
import Categories from "../../components/Filters/Categories";
import PriceFilter from "../../components/Filters/PriceFilter";
import ColorFilter from "../../components/Filters/ColorFilter";

const categories = content.categories;

const ProductListPage = ({ categoryType }) => {
  const categoryContent = useMemo(() => {
    return categories?.find(
      (category) => category.code === categoryType.toUpperCase()
    );
  }, [categoryType]);

  return (
    <div>
      <div className="flex">
        <div className="w-[25%] p-[20px] border rounded-lg m-[20px]">
          {/* Filters */}
          <div className="flex justify-between">
            <p className="text-[16px] text-gray-600">필터</p>
            <FilterIcon />
          </div>
          <div>
            <p className="text-[16px] text-black mt-5">카테고리</p>
            <Categories types={categoryContent?.types} />
            <hr />
          </div>
          <PriceFilter />
          {/* 색상 */}
          <ColorFilter colors={categoryContent?.meta_data?.colors} />
          <hr />
        </div>
        <div className="p-[15px]">
          {/* Products  */}
          <p className="text-black text-lg">{categoryContent?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
