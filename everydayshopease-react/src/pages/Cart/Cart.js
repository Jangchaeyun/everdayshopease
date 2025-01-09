import React, { useCallback, useState } from "react";
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

const headers = ["제품 상세", "가격", "수량", "배송비", "소계", "액션"];

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [deleteItem, setDeleteItem] = useState({});

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
  return (
    <>
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
                </tr>
              );
            })}
          </tbody>
        </table>
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
