export const handleAuthentication = (data) => {
  const USER_SESSION = JSON.stringify({
    is_authenticated: true,
    token: data.token,
  });
  localStorage.setItem("session", USER_SESSION);
};
