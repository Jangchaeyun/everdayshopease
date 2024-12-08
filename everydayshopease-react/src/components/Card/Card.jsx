import React from "react";

const Card = ({ imagePath, title }) => {
  return (
    <div className="flex flex-col p-6">
      <img
        className="h-[240px] w-[200px] bg-cover bg-center border rounded hover:scale-105 cursor-pointer"
        src={imagePath}
        height={"320px"}
        width={"420px"}
        alt="Jeans"
      />
      <p className="text-[16px] p-[5px]">{title}</p>
    </div>
  );
};

export default Card;
