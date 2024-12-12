import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./PriceFilter.css";

const PriceFilter = () => {
  const [range, setRange] = useState({
    min: 100000,
    max: 200000,
  });
  return (
    <div>
      <p className="text-[16px] text-black mt-5">가격</p>
      <RangeSlider
        className={`custom-range-slider`}
        min={50000}
        max={300000}
        defaultValue={[range.min, range.max]}
        onInput={(values) =>
          setRange({
            min: values[0],
            max: values[1],
          })
        }
      />
      <div className="flex justify-between">
        <div className="border rounded-lg h-8 mt-4 max-w-[50%] w-[40%] flex items-center">
          <input
            type="text"
            value={range?.min.toLocaleString() + "원"}
            className="outline-none px-4 text-gray-600"
            min={0}
            max="200000"
            disabled
            placeholder="최소"
          />
        </div>
        <div className="border rounded-lg h-8 mt-4 max-w-[50%] w-[40%] flex items-center">
          <input
            type="text"
            value={range?.max.toLocaleString() + "원"}
            className="outline-none px-4 text-gray-600"
            min={0}
            max="250000"
            disabled
            placeholder="최대"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
