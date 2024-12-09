import React from "react";
import ArrowIcon from "../common/ArrowIcon";

const Card = ({
  imagePath,
  title,
  description,
  actionArrow,
  height,
  width,
}) => {
  return (
    <div className="flex flex-col p-6">
      <img
        className="bg-cover bg-center border rounded hover:scale-105 cursor-pointer"
        src={imagePath}
        alt="Jeans"
        style={{
          height: height || "240px",
          width: width || "200px",
        }}
      />
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-[16px] p-2">{title}</p>
          {description && (
            <p className="text-[14px] px-1 text-gray-600">{description}</p>
          )}
        </div>
        {actionArrow && (
          <span className="cursor-pointer pr-2 py-2 items-center">
            <ArrowIcon />
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
