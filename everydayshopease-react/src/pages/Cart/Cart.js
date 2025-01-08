import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/features/cart";

const headers = ["제품 상세", "가격", "수량", "배송비", "소계", "액션"];

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  return (
    <div className="p-4">
      <p className='tex-sm text-black p-4"'>장바구니</p>
      <table className="w-full text-lg">
        <thead className="text-sm bg-black text-white uppercase">
          <tr>
            {headers?.map((header) => {
              return (
                <th scope="col" className="px-6 py-3">
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {cartItems?.map((item, index) => {
            return (
              <tr className="p-4">
                <td>
                  <div className="flex">
                    <img
                      src={item?.thumbnail}
                      alt={"product-" + index}
                      className="w-[120px] h-[120px] object-cover p-4"
                    />
                    <div className="flex flex-col text-sm px-2 text-gray-600">
                      <p>{item?.name || "이름"}</p>
                      <p>사이즈: {item?.variant?.size}</p>
                      <p>색상: {item?.variant?.color}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="text-center text-sm text-gray-600">
                    {item?.price.toLocaleString()}원
                  </p>
                </td>
                <td></td>
                <td>
                  <p className="text-center text-sm text-gray-600">무료배송</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
