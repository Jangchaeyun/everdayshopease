import React, { useCallback } from "react";
import { logOut } from "../../utils/jwt-helper";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const onLogOut = useCallback(() => {
    logOut();
    navigate("/");
  }, [navigate]);
  return (
    <div className="p-8">
      <p className="text-lg font-bold">내 계정</p>
      <button
        onClick={onLogOut}
        className="w-[150px] items-center h-[48px] bg-black border rounded-lg mt-2 text-white hover:bg-gray-800"
      >
        로그아웃
      </button>
    </div>
  );
};

export default Account;
