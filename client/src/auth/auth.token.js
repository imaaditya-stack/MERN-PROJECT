export const getAuthToken = () => {
  try {
    const USER_SESSION = JSON.parse(localStorage?.session);
    return USER_SESSION?.token;
  } catch (error) {
    if (error) return "";
  }
};
