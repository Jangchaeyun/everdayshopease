import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/common";
import { addAddressAPI } from "../../api/userInfo";
import { saveAddress } from "../../store/features/user";

const AddAddress = ({ onCancel }) => {
  const [values, setValues] = useState({
    name: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(setLoading(true));
      setError("");
      addAddressAPI(values)
        .then((res) => {
          dispatch(saveAddress(res));
          onCancel && onCancel();
        })
        .catch((err) => {
          setError("주소가 추가되지 않았습니다.");
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, onCancel, values]
  );

  const handleOnChange = useCallback((e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target?.value,
    }));
  }, []);

  return (
    <div>
      <p className="text-xl pt-3">주소 추가</p>
      <form onSubmit={onSubmit} className="pt-2 mb-2 md:w-[420px] w-full">
        <label>이름</label>
        <input
          type="text"
          name="name"
          value={values?.name}
          onChange={handleOnChange}
          placeholder="배송지 이름"
          className="w-full border p-2 my-2 border-gray-400"
          required
        />
        <label>전화번호</label>
        <input
          type="text"
          name="phoneNumber"
          value={values?.phoneNumber}
          onChange={handleOnChange}
          placeholder="배송지 전화번호"
          className="w-full border p-2 my-2 border-gray-400"
          required
        />
        <label>주소</label>
        <div className="flex gap-4">
          <input
            type="text"
            name="state"
            value={values?.state}
            onChange={handleOnChange}
            placeholder="도/특별시/광역시"
            className="w-full border p-2 my-2 border-gray-400"
            required
          />
          <input
            type="text"
            name="city"
            value={values?.city}
            onChange={handleOnChange}
            placeholder="시/군/구"
            className="w-full border p-2 my-2 border-gray-400"
            required
          />
        </div>
        <input
          type="text"
          name="street"
          value={values?.street}
          onChange={handleOnChange}
          placeholder="도로명 주소"
          className="w-full border p-2 my-2 border-gray-400"
          required
        />
        <input
          type="text"
          name="zipCode"
          value={values?.zipCode}
          onChange={handleOnChange}
          placeholder="우편번호"
          className="w-full border p-2 my-2 border-gray-400"
          required
        />

        <div className="flex gap-4 mt-4">
          <button
            onSubmit={onCancel}
            type="button"
            className="border-2 border-gray-400 rounded-lg w-[120px] h-[42px]"
          >
            취소
          </button>
          <button
            type="submit"
            className="bg-black text-white rounded-lg w-[120px] h-[42px]"
          >
            저장
          </button>
        </div>
      </form>
      {error && <p className="text-lg text-red-700">{error}</p>}
    </div>
  );
};

export default AddAddress;
