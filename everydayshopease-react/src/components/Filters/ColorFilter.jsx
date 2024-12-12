import React, { useCallback, useState } from "react";
const colorSeletor = {
  블랙: "#000000",
  화이트: "#FFFFFF",
  실버: "#C0C0C0",
  "라이트 그레이": "#D3D3D3",
  그레이: "#808080",
  "다크 그레이": "#A9A9A9",
  레드: "#FF0000",
  딥레드: "#8B0000",
  버건디: "#800020",
  "페일 핑크": "#FFD1DC",
  "라이트 핑크": "#FFB6C1",
  핑크: "#FFC0CB",
  로즈골드: "#B76E79",
  오렌지: "#FFA500",
  아이보리: "#FFFFF0",
  "라이트 옐로우": "#FFFFE0",
  옐로우: "#FFFF00",
  골드: "#FFD700",
  라임: "#00FF00",
  "라이트 그린": "#90EE90",
  그린: "#008000",
  "올리브 그린": "#808000",
  카키: "#F0E68C",
  "다크 그린": "#006400",
  민트: "#98FF98",
  "스카이 블루": "#87CEEB",
  블루: "#0000FF",
  네이비: "#000080",
  "다크  네이비": "#001F54",
  라벤더: "#E6E6FA",
  퍼플: "#800080",
  "라이트 브리운": "#D2B48C",
  브라운: "#A52A2A",
  "다크 브라운": "#654321",
  카멜: "#C19A6B",
  샌드: "#F4A460",
  베이지: "#F5F5DC",
  "다크 베이지": "#A49A87",
  "카키 베이지": "#C3B091",
  데님: "#1560BD",
  연청: "#A0D2FF",
  진청: "#002E6E",
  흑청: "#1C2E50",
};

const ColorFilter = ({ colors }) => {
  const [appliedColors, setAppliedColors] = useState([]);
  const onClickDiv = useCallback(
    (item) => {
      if (appliedColors.indexOf(item)) {
        appliedColors.splice(appliedColors.indexOf(item), 1);
      } else {
        setAppliedColors({ ...appliedColors, item });
      }
    },
    [appliedColors]
  );
  return (
    <div className="flex flex-col mb-4">
      <p className="text-[16px] text-black mt-5 mb-5">색상</p>
      <div className="flex flex-wrap px-2">
        {colors?.map((item) => {
          return (
            <div className="flex flex-col mr-2">
              <div
                className="w-8 h-8 border rounded-xl mr-5 cursor-pointer hover:outline-2 hover:scale-110 items-center"
                onClick={onClickDiv}
                style={{ background: `${colorSeletor[item]}` }}
              ></div>
              <p
                className="text-sm text-gray-400 mb-2 items-center"
                style={{
                  color: `${appliedColors?.includes(item) ? "black" : ""}`,
                }}
              >
                {item}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorFilter;