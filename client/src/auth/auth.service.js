export const handleAuthentication = (data) => {
  const USER_SESSION = JSON.stringify({
    is_authenticated: true,
    ...data,
  });
  localStorage.setItem("session", USER_SESSION);
};
