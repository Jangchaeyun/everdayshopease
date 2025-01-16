import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/features/common";
import { cancelOrderAPI, fetchOrderAPI } from "../../api/userInfo";
import {
  cancelOrder,
  loadOrders,
  selectAllOrders,
} from "../../store/features/user";
import moment from "moment";
import Timeline from "../../components/TimeLine/TimeLine";
import { getStepCount } from "../../utils/order-utils";

const Orders = () => {
  const disaptch = useDispatch();
  const allOrders = useSelector(selectAllOrders);
  const [selectedFilter, setSelectedFilter] = useState("ACTIVE");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");

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
            name: orderItem?.product?.name,
            price: orderItem?.product?.price,
            quantity: orderItem?.quantity,
            url: orderItem?.product?.resources?.[0]?.url,
            slug: orderItem?.product?.slug,
          };
        }),
        totalAmount: order?.totalAmount,
      });
    });
    setOrders(displayOrders);
  }, [allOrders]);

  const handleOnChange = useCallback((evt) => {
    const value = evt?.target?.value;
    setSelectedFilter(value);
  }, []);

  const onCancelOrder = useCallback(
    (id) => {
      disaptch(setLoading(true));
      cancelOrderAPI(id)
        .then((res) => {
          disaptch(cancelOrder(id));
        })
        .catch((err) => {})
        .finally(() => {
          disaptch(setLoading(false));
        });
    },
    [disaptch]
  );

  return (
    <div>
      {orders?.length > 0 && (
        <div className="md:w-[70%] w-full">
          <div className="flex justify-between">
            <h1 className="text-2xl mb-4">내 주문</h1>
            <select
              className="border-2 rounded-lg mb-4 p-2"
              value={selectedFilter}
              onChange={handleOnChange}
            >
              <option value={"ACTIVE"}>주문</option>
              <option value={"CANCELLED"}>취소</option>
              <option value={"COMPLETED"}>완료</option>
            </select>
          </div>
          {orders?.map((order, index) => {
            return (
              order?.status === selectedFilter && (
                <div key={index}>
                  <div className="bg-gray-200 p-4 mb-8">
                    <p>주문 번호. #{order?.id}</p>
                    <div className="flex justify-between mt-2">
                      <div className="flex flex-col text-gray-500 text-sm">
                        <p>
                          주문 날짜 :{" "}
                          {moment(order?.orderDate).format("YY/MM/DD")}
                        </p>
                        <p>
                          배송 예정 날짜:{" "}
                          {moment(order?.orderDate)
                            .add(3, "days")
                            .format("YY/MM/DD")}
                        </p>
                      </div>
                      <div className="flex flex-col text-gray-500 text-sm">
                        <p>주문 상태 : {order?.orderStatus}</p>
                        <button
                          onClick={() => setSelectedOrder(order?.id)}
                          className="text-blue-900 text-right rounded underline cursor-pointer"
                        >
                          상세 보기
                        </button>
                      </div>
                    </div>
                  </div>
                  {selectedOrder === order?.id && (
                    <div>
                      {order?.items?.map((orderItem, index) => {
                        return (
                          <div key={index} className="flex gap-4">
                            <img
                              src={orderItem?.url}
                              alt={orderItem?.name}
                              className="w-[120px] h-[120px] object-cover rounded"
                            />
                            <div className="flex flex-col text-sm py-2 text-gray-600">
                              <p>{orderItem?.name || "이름"}</p>
                              <p>수량 {orderItem?.quantity}</p>
                            </div>
                          </div>
                        );
                      })}
                      <div className="flex justify-between">
                        <p>총 가격 : {order?.totalAmount.toLocaleString()}원</p>
                        <button
                          onClick={() => setSelectedOrder("")}
                          className="text-blue-900 text-right rounded underline cursor-pointer"
                        >
                          숨기기
                        </button>
                      </div>
                      {order?.orderStatus !== "CANCELLED" && (
                        <>
                          <Timeline
                            stepCount={getStepCount[order?.orderStatus]}
                          />
                          {getStepCount[order?.orderStatus] <= 2 && (
                            <button
                              onClick={() =>
                                setSelectedOrder(onCancelOrder(order?.id))
                              }
                              className="bg-black h-[42px] w-[120px] text-white underline cursor-pointer rounded-lg"
                            >
                              주문 취소
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
