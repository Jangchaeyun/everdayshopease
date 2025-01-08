import { addToCart } from "../features/cart";

export const addItemToCartAction = (productItem) => {
  return (dispatch, state) => {
    dispatch(addToCart(productItem));
    updateLocalStorage(state);
  };
};

const updateLocalStorage = (state) => {
  const { cartState } = state();
  localStorage.setItem("cart", JSON.stringify(cartState?.cart));
};