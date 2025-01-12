import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/features/cart";
import NumberInput from "../../components/NumberInput/NumberInput";
import {
  deleteItemFromCartAction,
  updateItemToCartAction,
} from "../../store/actions/cartAction";
import DeleteIcon from "../../components/common/DeleteIcon";
import Modal from "react-modal";
import { customStyles } from "../../styles/modal";
import { isTokenValid } from "../../utils/jwt-helper";
import { Link, useNavigate } from "react-router-dom";
import EmptyCart from "../../assets/img/empty_cart.png";

const headers = ["제품 상세", "가격", "수량", "배송비", "소계", "액션"];

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const navigate = useNavigate();

  const onChangeQuantity = useCallback(
    (value, productId, variantId) => {
      console.log("Received ", value);

      dispatch(
        updateItemToCartAction({
          productId: productId,
          variant_id: variantId,
          quantity: value,
        })
      );
    },
    [dispatch]
  );

  const onDeleteProduct = useCallback((productId, variantId) => {
    setModalIsOpen(true);
    setDeleteItem({
      productId: productId,
      variantId: variantId,
    });
  }, []);

  const onCloseModal = useCallback(() => {
    setDeleteItem({});
    setModalIsOpen(false);
  }, []);

  const onDeleteItem = useCallback(() => {
    dispatch(deleteItemFromCartAction(deleteItem));
    setModalIsOpen(false);
  }, [deleteItem, dispatch]);

  const subTotal = useMemo(() => {
    let value = 0;
    cartItems?.forEach((element) => {
      value += element?.subTotal;
    });
    return value;
  }, [cartItems]);

  const isLoggedIn = useMemo(() => {
    return isTokenValid();
  }, []);

  console.log("isLoggedin ", isLoggedIn, isTokenValid());
  return (
    <>
      <div className="p-4">
        {cartItems?.length > 0 && (
          <>
            <p className="text-xl text-black p-4">장바구니</p>
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
                    <tr className="p-4 bg-white border-b">
                      <td>
                        <div className="flex p-4">
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
                      <td>
                        <NumberInput
                          max={2}
                          quantity={item?.quantity}
                          onChangeQuantity={(value) =>
                            onChangeQuantity(
                              value,
                              item?.productId,
                              item?.variant?.id
                            )
                          }
                        />
                      </td>
                      <td>
                        <p className="text-center text-sm text-gray-600">
                          무료배송
                        </p>
                      </td>
                      <td>
                        <p className="text-center text-sm text-gray-600">
                          {item?.subTotal.toLocaleString()}원
                        </p>
                      </td>
                      <td>
                        <button
                          className="flex items-center w-full justify-center"
                          onClick={() =>
                            onDeleteProduct(item?.productId, item?.variant?.id)
                          }
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                      <hr className="h-4 bg-gray-400"></hr>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-between bg-gray-200 p-8">
              <div>
                <p className="text-lg font-bold">할인 쿠폰</p>
                <p className="text-sm text-gray-600">쿠폰 코드 입력</p>
                <form>
                  <input
                    type="text"
                    className="w-[120px] h-[48px]  mt-2 border-gray-500 rounded-lg p-2 hover:outline-none"
                    placeholder="쿠폰 코드 입력"
                  />
                  <button className="w-[80px] h-[48px] bg-black border rounded-lg text-white">
                    적용
                  </button>
                </form>
              </div>
              <div className="mr-20 pr-8">
                <div className="flex gap-8 text-lg">
                  <p className="w-[120px]">소계</p>
                  <p>{subTotal.toLocaleString()}원</p>
                </div>
                <div className="flex gap-8 text-lg mt-2">
                  <p className="w-[120px]">배송비</p>
                  <p>0원</p>
                </div>
                <div className="flex gap-8 text-lg mt-2 font-bold">
                  <p className="w-[120px]">총 가격</p>
                  <p>{subTotal.toLocaleString()}원</p>
                </div>
                <hr className="h-[2px] bg-slate-400 mt-2"></hr>
                {isLoggedIn && (
                  <button
                    className="w-full items-center h-[48px] bg-black border rounded-lg mt-2 text-white hover:bg-gray-800"
                    onClick={() => navigate("/checkout")}
                  >
                    결제하기
                  </button>
                )}
                {!isLoggedIn && (
                  <div className="p-4">
                    <Link
                      to={"/v1/login"}
                      className="w-full p-2 items-center h-[48px] bg-black border rounded-lg mt-4 text-white hover:bg-gray-800"
                    >
                      로그인 후 결제하기
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {!cartItems?.length && (
          <div className="w-full items-center text-center">
            <div className="flex justify-center">
              <img
                src={EmptyCart}
                className="w-[240px] h-[240px]"
                alt="empty-cart"
              />
            </div>
            <p className="text-3xl">장바구니가 비어있습니다</p>
            <div className="p-4">
              <Link
                to={"/"}
                className="w-full p-2 items-center h-[48px] bg-black border rounded-lg mt-4 text-white hover:bg-gray-800"
              >
                쇼핑 계속하기
              </Link>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="아이템 지우기"
      >
        <p>정말로 지우시겠습니까?</p>
        <div className="flex justify-between p-4">
          <button className="w-[80px] h-[48px]" onClick={onCloseModal}>
            취소
          </button>
          <button
            className="bg-black text-white w-[80px] h-[48px] border rounded-lg"
            onClick={() => onDeleteItem()}
          >
            삭제
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Cart;
