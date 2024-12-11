import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import FilterIcon from "../../components/common/FilterIcon";

const ProductListPage = () => {
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
          </div>
        </div>
        <div className="p-[40px]">
          {/* Products  */}
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
