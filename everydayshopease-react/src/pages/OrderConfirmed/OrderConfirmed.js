import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

const OrderConfirmed = () => {
  const location = useLocation();
  const orderId = useMemo(() => {
    const query = new URLSearchParams(location.search);
    const orderId = query.get("orderId");
    return orderId;
  }, [location.search]);
  return (
    <div className="p-8">
      <h1 className="text-2xl">저희와 함께 쇼핑해주셔서 감사합니다!</h1>
      <p>
        주문이 성공적으로 이루어졌습니다. 주문 ID는 <strong>{orderId}</strong>{" "}
        입니다.
      </p>
    </div>
  );
};

export default OrderConfirmed;
