import React from "react";
import GoogleLogo from "../../assets/img/Google.png";

const GoogleSignin = () => {
  return (
    <button className="flex justify-center items-center border w-full rounded border-gray-600 h-[48px] hover:bg-slate-50">
      <img src={GoogleLogo} alt="google-icon" />
      <p className="px-2 text-gray-500">구글로 계속</p>
    </button>
  );
};

export default GoogleSignin;
