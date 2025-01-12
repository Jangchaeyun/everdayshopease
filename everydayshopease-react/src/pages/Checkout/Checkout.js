import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/features/cart";
import { setLoading } from "../../store/features/common";
import { fetchUserDetails } from "../../api/userInfo";
import { useNavigate } from "react-router-dom";
import PaymentPage from "../PaymentPage/PaymentPage";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");

  const subTotal = useMemo(() => {
    let value = 0;
    cartItems?.forEach((element) => {
      value += element?.subTotal;
    });
    return value;
  }, [cartItems]);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchUserDetails()
      .then((res) => {
        setUserInfo(res);
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  return (
    <div className="p-8 flex">
      <div className="w-[70%]">
        <div className="flex gap-8">
          {/* 주소 */}
          <p className="font-bold">배달 주소</p>
          {userInfo?.addressList && (
            <div>
              <p>{userInfo?.addressList?.[0]?.name}</p>
              <p>{userInfo?.addressList?.[0]?.street}</p>
              <p>
                {userInfo?.addressList?.[0]?.city},{" "}
                {userInfo?.addressList?.[0]?.state}{" "}
                {userInfo?.addressList?.[0]?.zipCode}
              </p>
            </div>
          )}
        </div>
        <hr className="h-[2px] bg-slate-200 w-[90%] my-4"></hr>
        <div className="flex gap-8 flex-col">
          <p className="font-bold">주소 선택</p>
          <div>
            <p>날짜 선택</p>
            <div className="flex gap-4 mt-4">
              <div className="w-[80px] h-[48px] flex flex-col justify-center border text-center mb-4 rounded-lg mr-4 cursor-pointer hover:scale-110 bg-gray-200 border-gray-500 text-gray-500">
                <p>{"01월 13일"}</p>
              </div>
              <div className="w-[80px] h-[48px] flex flex-col justify-center border text-center mb-4 rounded-lg mr-4 cursor-pointer hover:scale-110 bg-white border-gray-500 text-gray-500">
                <p>{"01월 14일"}</p>
              </div>
            </div>
          </div>
        </div>
        <hr className="h-[2px] bg-slate-200 w-[90%] my-4"></hr>
        <div className="flex flex-col gap-2">
          {/* 주소 */}
          <p className="font-bold">결제 정보</p>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex gap-2">
              <input
                type="radio"
                name="결제 방법"
                value={"CARD"}
                onChange={() => setPaymentMethod("CARD")}
              />
              <p>신용/체크 카드</p>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="결제 방법"
                value={"COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              <p>착불 결제</p>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="결제 방법"
                value={"UPI"}
                onChange={() => setPaymentMethod("UPI")}
              />
              <p>UPI/지갑</p>
            </div>
          </div>
        </div>
        {paymentMethod === "CARD" && (
          <PaymentPage
            userid={userInfo?.id}
            addressId={userInfo?.addressList?.[0]?.id}
          />
        )}
        {paymentMethod !== "CARD" && (
          <button
            className="w-[150px] items-center h-[48px] bg-black border rounded-lg mt-4 text-white hover:bg-gray-800"
            onClick={() => navigate("/payment")}
          >
            결제하기
          </button>
        )}
      </div>
      <div className="w-[30%] h-[30%] border rounded-lg border-gray-500 p-4 flex flex-col gap-4">
        <p>주문 요약</p>
        <p>장바구니 개수 - {cartItems?.length}</p>
        <p>소계 - {subTotal.toLocaleString()}원</p>
        <p>배송비 - 무료</p>
        <hr className="h-[2px] bg-gray-400 "></hr>
        <p>합계 - {subTotal.toLocaleString()}원</p>
      </div>
    </div>
  );
};

export default Checkout;
