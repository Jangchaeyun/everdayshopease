import { jwtDecode } from "jwt-decode";

export const isTokenValid = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Invalid token", token);
    return false;
  }
};

export const saveToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const logOut = () => {
  localStorage.removeItem("authToken");
};
