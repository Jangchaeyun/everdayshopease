import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

const AddAddress = ({ onCancel }) => {
  const [values, setValues] = useState({
    name: "",
    phoneNumber: "",
    street: "",
    state: "",
    zipCode: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {}, []);

  //   const handleOnChange = useCallback((e) => {
  //     e.persist();
  //     setValues((values) => ({
  //       ...values,
  //       [e.target.name]: e.target?.value,
  //     }));
  //   }, []);

  return (
    <div>
      <p className="text-xl pt-3">주소 추가</p>
      <form onSubmit={onSubmit} className="pt-2 mb-2 md:w-[420px] w-full">
        <label>이름</label>
        <input
          type="text"
          name="name"
          value={values?.name}
          onChange={onCancel}
          placeholder="배송지 이름"
          className="w-full border p-2 my-2 border-gray-400"
          required
        />
        <label>전화번호</label>
        <input
          type="text"
          name="phoneNumber"
          value={values?.phoneNumber}
          onChange={onCancel}
          placeholder="배송지 전화번호"
          className="w-full border p-2 my-2 border-gray-400"
          required
        />
        <label>주소</label>
        <div className="flex gap-4">
          <input
            type="text"
            name="state"
            //   value={values?.state}
            onChange={onCancel}
            placeholder="도/특별시/광역시"
            className="w-full border p-2 my-2 border-gray-400"
            required
          />
          <input
            type="text"
            name="city"
            value={values?.city}
            onChange={onCancel}
            placeholder="시/군/구"
            className="w-full border p-2 my-2 border-gray-400"
            required
          />
        </div>
        <input
          type="text"
          name="street"
          value={values?.street}
          onChange={onCancel}
          placeholder="도로명 주소"
          className="w-full border p-2 my-2 border-gray-400"
          required
        />
        <input
          type="text"
          name="zipCode"
          value={values?.zipCode}
          onChange={onCancel}
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
    </div>
  );
};

export default AddAddress;
