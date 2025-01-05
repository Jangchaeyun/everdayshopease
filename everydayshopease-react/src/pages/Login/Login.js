import React, { useCallback, useState } from "react";
import GoogleSignin from "../../components/Buttons/GoogleSignin";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/common";
import { loginAPI } from "../../api/authentication";
import { saveToken } from "../../utils/jwt-helper";

const Login = () => {
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Values ", values);
      setError("");
      dispatch(setLoading(true));
      loginAPI(values)
        .then((res) => {
          if (res?.token) {
            saveToken(res?.token);
            navigate("/");
          } else {
            setError("문제가 발생했습니다!");
          }
        })
        .catch((err) => {
          // To-do Check response status
          setError("잘못된 자격 증명입니다!");
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, navigate, values]
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
      <p className="text-3xl font-bold pb-4 pt-4">로그인</p>
      <GoogleSignin />
      <p className="text-gray-500 items-center text-center w-full py-2">또는</p>

      <div className="pt-4">
        <form onSubmit={onSubmit} autoComplete="off">
          <input
            type="email"
            name="userName"
            value={values?.userName}
            onChange={handleOnChange}
            placeholder="이메일 주소"
            className="h-[48px] w-full border p-2 border-gray-400"
            required
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            value={values?.password}
            onChange={handleOnChange}
            placeholder="비밀번호"
            className="h-[48px] mt-8 w-full border p-2 border-gray-400"
            required
            autoComplete="new-password"
          />
          <Link className="text-right w-full float-right underline pt-2 text-gray-500 hover:text-black">
            비밀번호를 잊어버렸나요?
          </Link>
          <button className="border w-full rounded-lg h-[48px] mb-4 bg-black text-white mt-4 hover:opacity-80">
            로그인
          </button>
        </form>
      </div>
      {error && <p className="text-lg text-red-700">{error}</p>}
      <Link
        to={"/v1/register"}
        className="underline text-gray-500 hover:text-black"
      >
        계정이 없으십니까? 회원가입
      </Link>
    </div>
  );
};

export default Login;
