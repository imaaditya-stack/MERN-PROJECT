import { isExpired } from "react-jwt";

export const handleAuthentication = (data) => {
  const USER_SESSION = JSON.stringify({
    is_authenticated: true,
    ...data,
  });
  localStorage.setItem("session", USER_SESSION);
};

export const isAuthenticated = () => {
  try {
    const USER_SESSION = JSON.parse(localStorage?.session);
    if (isExpired(USER_SESSION?.token)) return false;
    return true;
  } catch (error) {
    if (error) return false;
  }
};
