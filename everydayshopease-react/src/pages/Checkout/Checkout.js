import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/features/cart";
import { setLoading } from "../../store/features/common";
import { fetchUserDetails } from "../../api/userInfo";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState([]);

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
  }, []);

  return (
    <div className="p-8 flex">
      <div className="w-[70%]">
        <div>
          {/* 주소 */}
          <p>배달 주소</p>
        </div>
      </div>
      <div className="w-[30%] border rounded-lg border-gray-500 p-4 flex flex-col gap-4">
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
