import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAddress, selectUserInfo } from "../../store/features/user";
import AddAddress from "./AddAddress";
import { setLoading } from "../../store/features/common";
import { deleteAddressAPI } from "../../api/userInfo";

const Profile = () => {
  const userInfo = useSelector(selectUserInfo);
  const [addAddress, setAddAddress] = useState(false);
  const disaptch = useDispatch();

  const onDeleteAddress = useCallback(
    (id) => {
      disaptch(setLoading(true));
      deleteAddressAPI(id)
        .then((res) => {
          disaptch(removeAddress(id));
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
      <h1 className="text-2xl">나의 정보</h1>
      {!addAddress && (
        <div>
          <div className="flex gap-2">
            <p className="text-xl pt-4">계정 정보</p>
            <button className="underline text-blue-500 text-center mt-4">
              수정
            </button>
          </div>
          <div className="pt-4">
            <p className="text-gray-700 py-2 font-bold">이름</p>
            <p>
              {userInfo?.firstName}
              {userInfo?.lastName}
            </p>
            <p className="text-gray-700 py-2 font-bold">전화번호</p>
            <p>{userInfo?.phoneNumber ?? "None"}</p>
            <p className="text-gray-700 py-2 font-bold">이메일</p>
            <p>{userInfo?.email}</p>
          </div>
          <div className="pt-4">
            <div className="flex gap-12">
              <h3 className="text-lg font-bold">주소</h3>
              <button
                className="underline text-blue-900"
                onClick={() => setAddAddress(true)}
              >
                새로운 주소 추가
              </button>
            </div>
            <div className="pt-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-8 pb-10">
              {userInfo?.addressList?.map((address, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-200 border rounded-lg p-4"
                  >
                    <p className="py-2 font-bold">{address?.name}</p>
                    <p className="pb-2">{address?.phoneNumber}</p>
                    <p className="pb-2">
                      {address?.state}, {address?.city}, {address?.street}
                    </p>
                    <p>{address?.zipCode}</p>
                    <div className="flex gap-2">
                      <button className="underline text-blue-900">수정</button>
                      <button
                        onClick={() => onDeleteAddress(address?.id)}
                        className="underline text-blue-900"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {addAddress && <AddAddress onCancel={() => setAddAddress(false)} />}
    </div>
  );
};

export default Profile;
