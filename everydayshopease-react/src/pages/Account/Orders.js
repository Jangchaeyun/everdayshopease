import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/features/common";
import { fetchOrderAPI } from "../../api/userInfo";
import { loadOrders, selectAllOrders } from "../../store/features/user";

const Orders = () => {
  const disaptch = useDispatch();
  const allOrders = useSelector(selectAllOrders);
  const [selectedFilter, setSelectedFilter] = useState("ACTIVE");

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    disaptch(setLoading(true));
    fetchOrderAPI()
      .then((res) => {
        disaptch(loadOrders(res));
      })
      .catch((err) => {})
      .finally(() => {
        disaptch(setLoading(false));
      });
  }, [disaptch]);

  useEffect(() => {
    const displayOrders = [];
    allOrders?.map((order) => {
      displayOrders.push({
        id: order?.id,
        orderDate: order?.orderDate,
        orderStatus: order?.orderStatus,
        status:
          order?.orderStatus === "PENDING" ||
          order?.orderStatus === "IN_PROGRESS" ||
          order?.orderStatus === "SHIPPED"
            ? "ACTIVE"
            : order?.orderStatus === "DELIVERED"
            ? "COMPLETED"
            : order?.orderStatus,
        items: order?.orderItemList?.map((orderItem) => {
          return {
            id: orderItem?.id,
            name: orderItem?.name,
            price: orderItem?.price,
            quantity: orderItem?.quantity,
            url: orderItem?.product?.resources?.[0]?.url,
            slug: orderItem?.product?.slug,
          };
        }),
      });
    });

    setOrders(displayOrders);
  }, [allOrders]);

  const handleOnChange = useCallback((evt) => {
    const value = evt?.target?.value;
    setSelectedFilter(value);
  }, []);
  return (
    <div>
      {orders?.length > 0 && (
        <div className="md:w-[70%] w-full">
          <div className="flex justify-between">
            <h1 className="text-2xl mb-4">내 주문</h1>
            <select
              className="border-2 rounded-lg mb-4 p-2"
              value={selectedFilter}
            >
              <option value={"ACTIVE"}>주문</option>
              <option value={"CANCELED"}>취소</option>
              <option value={"COMPLETED"}>완료</option>
            </select>
          </div>
          {orders?.map((order, index) => {
            return (
              <div key={index} className="bg-gray-200 p-4 mb-8">
                <p>주문 번호. #{order?.id}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
