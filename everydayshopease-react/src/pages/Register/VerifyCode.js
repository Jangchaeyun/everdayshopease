import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../store/features/common";
import { verifyAPI } from "../../api/authentication";

const VerifyCode = ({ email }) => {
  const [values, setValues] = useState({
    userName: email,
    code: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Values ", values);
      setError("");
      dispatch(setLoading(true));
      verifyAPI(values)
        .then((res) => {
          setMessage(
            "감사합니다! 귀하의 이메일이 성공적으로 확인되었습니다. 이제 귀하의 계정에 로그인할 수 있습니다."
          );
        })
        .catch((err) => {
          setError("입력하신 인증코드가 올바르지 않거나 만료되었습니다.");
        })
        .finally(() => dispatch(setLoading(false)));
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
    <div className="p-4">
      {!message && (
        <>
          <p className="text-lg text-blue-900">
            회원가입에 성공하셨습니다! 회원 등록을 완료하려면 이메일에서 확인
            코드를 확인하세요.
          </p>
          <p className="text-lg text-gray-600 pt-4 font-bold">
            계정을 인증하려면 이메일로 전송된 6자리 인증 코드를 입력하세요.
          </p>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="code"
              value={values?.code}
              maxLength={6}
              onChange={handleOnChange}
              placeholder="6자리 코드"
              className="h-[48px] border rounded border-gray-600 p-2 mt-4"
              required
            />
            <button
              type="submit"
              className="border w-[120px] rounded-lg h-[48px] bg-black text-white mb-4"
            >
              인증
            </button>
          </form>
          {error && <p className="text-xl to-red-600">{error}</p>}
        </>
      )}
      {message && <p className="text-lg">{message}</p>}
    </div>
  );
};

export default VerifyCode;
