export const sanitizeUserState = () => {
  try {
    const raw = localStorage.getItem("userState");
    if (!raw || raw === "undefined") {
      localStorage.removeItem("userState");
      return null;
    }
    const parsed = JSON.parse(raw);
    return {
      currentUser: parsed?.currentUser ?? null,
      token: parsed?.token ?? null,
    };
  } catch (err) {
    localStorage.removeItem("userState");
    return null;
  }
};
