import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignin from "../../components/Buttons/GoogleSignin";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/common";
import { registerAPI } from "../../api/authentication";
import VerifyCode from "./VerifyCode";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enableVerify, setEnableVerify] = useState(false);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError("");
      dispatch(setLoading(true));
      registerAPI(values)
        .then((res) => {
          if (res?.code === 200) {
            setEnableVerify(true);
          }
        })
        .catch((err) => {
          setError("이메일이 이미 존재합니다.");
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, values]
  );

  const handleOnChange = useCallback((e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target?.value,
    }));
  }, []);
  return (
    <div className="px-8 w-full lg:w-[70%]">
      {!enableVerify && (
        <>
          <p className="text-3xl font-bold pb-4 pt-4">회원가입</p>
          <GoogleSignin />
          <p className="text-gray-500 items-center text-center w-full py-2">
            또는
          </p>

          <div className="pt-4">
            <form onSubmit={onSubmit}>
              <label>이메일 주소</label>
              <input
                type="email"
                name="email"
                value={values?.email}
                onChange={handleOnChange}
                placeholder="이메일 주소"
                className="h-[48px] w-full border p-2 mt-2 mb-4 border-gray-400"
                required
              />
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                value={values?.password}
                onChange={handleOnChange}
                placeholder="비밀번호"
                className="h-[48px] mt-2 w-full border p-2 border-gray-400"
                required
                autoComplete="new-password"
              />
              <Link className="text-right w-full float-right underline pt-2 text-gray-500 hover:text-black">
                비밀번호를 잊어버렸나요?
              </Link>
              <button className="border w-full rounded-lg h-[48px] mb-4 bg-black text-white mt-4 hover:opacity-80">
                회원가입
              </button>
            </form>
          </div>
          {error && <p className="text-lg text-red-700">{error}</p>}
          <Link
            to={"/v1/login"}
            className="underline text-gray-500 hover:text-black"
          >
            계정이 있으십니까? 로그인
          </Link>
        </>
      )}
      {enableVerify && <VerifyCode email={values?.email} />}
    </div>
  );
};

export default Register;
